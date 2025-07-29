// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ onOrderSuccess }) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Get client secret from backend
    const { data } = await axios.post(
      import.meta.env.VITE_API_URL + "/stripe/create-payment-intent",
      { amount: total, currency: "usd" }
    );
    const clientSecret = data.clientSecret;

    // 2. Stripe: collect card and pay
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: shipping.fullName,
          email: shipping.email,
          phone: shipping.phone,
          address: {
            line1: shipping.address1,
            line2: shipping.address2,
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.zip,
            country: shipping.country === "United States" ? "US" : "NP",
          },
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    if (result.paymentIntent.status === "succeeded") {
      // 3. Place order in your DB as paid
      try {
        const items = cart.map((i) => ({
          product: i.productId,
          title: i.title,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
        }));
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/orders",
          {
            items,
            shippingInfo: shipping,
            total,
            paymentStatus: "paid",
            paymentId: result.paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        clearCart();
        if (onOrderSuccess) onOrderSuccess(res.data._id);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Order placed but failed to save in database."
        );
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <div className="flex gap-4">
        <input
          className="w-1/2 p-3 border rounded"
          placeholder="Full Name"
          value={shipping.fullName}
          onChange={(e) =>
            setShipping((s) => ({ ...s, fullName: e.target.value }))
          }
          required
        />
        <input
          className="w-1/2 p-3 border rounded"
          placeholder="Phone"
          value={shipping.phone}
          onChange={(e) =>
            setShipping((s) => ({ ...s, phone: e.target.value }))
          }
          required
        />
      </div>
      <input
        className="w-full p-3 border rounded"
        placeholder="Email"
        value={shipping.email}
        onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))}
        required
      />
      <input
        className="w-full p-3 border rounded"
        placeholder="Address Line 1"
        value={shipping.address1}
        onChange={(e) =>
          setShipping((s) => ({ ...s, address1: e.target.value }))
        }
        required
      />
      <input
        className="w-full p-3 border rounded"
        placeholder="Address Line 2 (optional)"
        value={shipping.address2}
        onChange={(e) =>
          setShipping((s) => ({ ...s, address2: e.target.value }))
        }
      />
      <div className="flex gap-4">
        <input
          className="w-1/2 p-3 border rounded"
          placeholder="City"
          value={shipping.city}
          onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
          required
        />
        <input
          className="w-1/2 p-3 border rounded"
          placeholder="ZIP / Postal Code"
          value={shipping.zip}
          onChange={(e) => setShipping((s) => ({ ...s, zip: e.target.value }))}
          required
        />
      </div>
      <div className="flex gap-4">
        <input
          className="w-1/2 p-3 border rounded"
          placeholder="State"
          value={shipping.state}
          onChange={(e) =>
            setShipping((s) => ({ ...s, state: e.target.value }))
          }
          required
        />
        <select
          className="w-1/2 p-3 border rounded"
          value={shipping.country}
          onChange={(e) =>
            setShipping((s) => ({ ...s, country: e.target.value }))
          }
        >
          <option>United States</option>
          <option>Nepal</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Card Details</label>
        <div className="p-3 border rounded">
          <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
        </div>
      </div>
      <div className="font-bold text-xl">Total: ${total.toFixed(2)}</div>
      <button
        type="submit"
        className="bg-[#6842ef] text-white px-6 py-3 rounded-xl font-bold"
        disabled={loading || !cart.length}
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
      {error && <div className="mt-2 text-red-500 font-medium">{error}</div>}
    </form>
  );
}

export default function CheckoutPage() {
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  // Redirect to /orders after successful order
  useEffect(() => {
    if (orderId) {
      const timer = setTimeout(() => navigate("/orders"), 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [orderId, navigate]);

  return (
    <div className="max-w-3xl mx-auto pt-28 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm onOrderSuccess={setOrderId} />
      </Elements>
      {orderId && (
        <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-xl text-green-700 font-bold">
          Order placed & paid! Redirecting to your orders...
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useApi } from "../Context/baseUrl";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingBag,
  FaEye,
  FaTruck,
  FaCheck,
  FaClock,
  FaBox,
  FaDownload,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import Navigation from "../components/Navigation/Navigation";

// Status configuration
const statusConfig = {
  processing: {
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
    icon: FaClock,
  },
  shipped: {
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    icon: FaTruck,
  },
  delivered: {
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50 border-green-200",
    textColor: "text-green-700",
    icon: FaCheck,
  },
  cancelled: {
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    icon: FaClock,
  },
};

// Status Badge Component
const StatusBadge = ({ status, size = "default" }) => {
  const config = statusConfig[status] || statusConfig.processing;
  const Icon = config.icon;

  const sizeClasses =
    size === "large" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";

  return (
    <div
      className={`inline-flex items-center ${sizeClasses} rounded-full font-semibold ${config.bgColor} ${config.textColor} border`}
    >
      <Icon className="mr-2" size={size === "large" ? 14 : 12} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

// Order Detail Modal
const OrderDetailModal = ({ order, isOpen, onClose }) => {
  const baseUrl = useApi();

  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Order Details
                </h2>
                <p className="text-gray-600 mt-1">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Order Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center mb-3">
                  <FaCalendarAlt className="text-blue-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Order Date</h3>
                </div>
                <p className="text-gray-700 font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-3">
                  <FaCreditCard className="text-green-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Total Amount</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center mb-3">
                  <FaBox className="text-purple-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Status</h3>
                </div>
                <StatusBadge status={order.status} size="large" />
              </div>
            </div>

            {/* Shipping Information */}
            {order.shippingInfo && (
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaMapMarkerAlt className="text-gray-600 mr-3" />
                  Shipping Address
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-medium">{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                    {order.shippingInfo.zipCode}
                  </p>
                  <p>{order.shippingInfo.country}</p>
                  {order.shippingInfo.phone && (
                    <p className="mt-2">
                      <span className="font-medium">Phone:</span>{" "}
                      {order.shippingInfo.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Order Items ({order.items.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <img
                      src={baseUrl + item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Price: ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Order Card Component
const OrderCard = ({ order, index, onViewDetails }) => {
  const baseUrl = useApi();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              Order #{order._id.slice(-8).toUpperCase()}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Order Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaShoppingBag className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">Items</p>
            <p className="text-xl font-semibold text-gray-900">
              {order.items.length}
            </p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Payment Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.paymentStatus?.charAt(0).toUpperCase() +
                order.paymentStatus?.slice(1)}
            </span>
          </div>
        </div>

        {/* Items Preview */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Items Preview</h4>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {order.items.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 bg-gray-50 rounded-xl p-3 border border-gray-200"
              >
                <img
                  src={baseUrl + item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-gray-600 font-medium truncate w-16">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">x{item.quantity}</p>
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="flex-shrink-0 w-16 h-20 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <span className="text-xs text-gray-600 font-medium">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(order)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
          >
            <FaEye className="group-hover:scale-110 transition-transform duration-200" />
            <span>View Details</span>
          </button>

          {order.status === "delivered" && (
            <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
              <FaDownload size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16"
  >
    <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
      <FaShoppingBag className="text-gray-400" size={48} />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      You haven't placed any orders yet. Start shopping to see your orders here!
    </p>
    <motion.a
      href="/productpage"
      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaShoppingBag className="mr-2" />
      Start Shopping
    </motion.a>
  </motion.div>
);

// Main Component
export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/orders/mine",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-gray-600 text-xl">
            Track and manage your order history
          </p>
        </motion.div>

        {orders.length > 0 && (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders or items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Orders Grid */}
            {filteredOrders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredOrders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <FaSearch className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Orders Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </>
        )}

        {orders.length === 0 && <EmptyState />}

        {/* Order Detail Modal */}
        <OrderDetailModal
          order={selectedOrder}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedOrder(null);
          }}
        />
      </div>
    </div>
  );
}

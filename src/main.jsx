import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./components/Products/ProductPage.jsx";
import AdminPanel from "./components/Dashboard/Adminpannel.jsx";
import { ApiProvider } from "./Context/baseUrl.jsx";

const router = createBrowserRouter([
  {
    path: "/Krishnanova",
    element: <App />,
  },
  {
    path: "/productpage",
    element: <ProductPage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </StrictMode>
);

import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f9fbfd]">
      {/* Admin Sidebar for navigation */}
      <AdminSidebar />

      {/* Main content area, where nested routes will render */}
      <div className="flex-1 p-8">
        <Outlet />{" "}
        {/* This is where the content of child routes will be rendered */}
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-semibold">CrowdSpark Admin Panel</h1>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
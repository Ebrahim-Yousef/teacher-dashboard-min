import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

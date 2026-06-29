"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaShieldHeart,
  FaChartPie,
  FaUsers,
  FaUserDoctor,
  FaClipboardList,
  FaCalendarDays,
  FaMoneyCheckDollar,
  FaArrowLeft,
  FaBars,
} from "react-icons/fa6";

import AdminRoute from "@/middleware/AdminRoute";

const menuItems = [
  {
    icon: FaChartPie,
    label: "Dashboard",
    href: "/dashboard/admin",
  },
  {
    icon: FaUsers,
    label: "Manage Users",
    href: "/dashboard/admin/users",
  },
  {
    icon: FaUserDoctor,
    label: "Manage Doctors",
    href: "/dashboard/admin/doctors",
  },
  {
    icon: FaClipboardList,
    label: "Doctor Requests",
    href: "/dashboard/admin/doctor-requests",
  },
  {
    icon: FaCalendarDays,
    label: "Manage Appointments",
    href: "/dashboard/admin/appointments",
  },
  {
    icon: FaMoneyCheckDollar,
    label: "Payment Management",
    href: "/dashboard/admin/payments",
  },
  {
    icon: FaChartPie,
    label: "Analytics",
    href: "/dashboard/admin/analytics",
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <AdminRoute>
      <div className="drawer lg:drawer-open">
        <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col bg-base-200/50">
          {/* Mobile Header */}
          <div className="flex items-center gap-3 p-4 lg:hidden bg-base-100 border-b border-base-300/50">
            <label
              htmlFor="admin-sidebar"
              className="btn btn-ghost btn-square btn-sm"
            >
              <FaBars className="text-xl" />
            </label>
            <div className="flex items-center gap-2">
              <FaShieldHeart className="text-primary text-xl" />
              <span className="font-bold tracking-tight">Admin</span>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          <label
            htmlFor="admin-sidebar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <aside className="w-72 min-h-full bg-base-100 border-r border-base-300/60 flex flex-col">
            {/* Branding */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaShieldHeart className="text-2xl text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight">
                    Admin Panel
                  </h2>
                  <p className="text-[11px] opacity-40 font-light uppercase tracking-widest">
                    MediCare
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 overflow-y-auto">
              <p className="text-[11px] font-bold uppercase tracking-widest opacity-30 px-3 mb-3">
                Main Menu
              </p>

              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard/admin" &&
                      pathname?.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
                        }`}
                      >
                        <Icon
                          className={`text-xl shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? "text-primary" : ""
                          }`}
                        />
                        <span>{item.label}</span>

                        {/* Active Indicator */}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer / Back Link */}
            <div className="p-4 mt-auto border-t border-base-300/50">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-base-content/50 hover:bg-base-200 hover:text-base-content transition-all duration-200 group"
              >
                <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Home</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </AdminRoute>
  );
}

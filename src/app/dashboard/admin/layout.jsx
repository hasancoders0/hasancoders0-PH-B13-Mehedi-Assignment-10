import Link from "next/link";

import AdminRoute from "@/middleware/AdminRoute";

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <div className="drawer lg:drawer-open">
        <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-6">
          <label
            htmlFor="admin-sidebar"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          >
            Menu
          </label>

          {children}
        </div>

        <div className="drawer-side">
          <label htmlFor="admin-sidebar" className="drawer-overlay"></label>

          <aside className="w-72 min-h-full bg-base-200 p-5">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

            <ul className="menu space-y-2">
              <li>
                <Link href="/dashboard/admin">Dashboard</Link>
              </li>

              <li>
                <Link href="/dashboard/admin/users">Manage Users</Link>
              </li>

              <li>
                <Link href="/dashboard/admin/doctors">Manage Doctors</Link>
              </li>

              <li>
                <Link href="/dashboard/admin/doctor-requests">
                  Doctor Requests
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/appointments">
                  Manage Appointments
                </Link>
              </li>

              <li>
                <Link href="/dashboard/admin/payments">Payment Management</Link>
              </li>

              <li>
                <Link href="/dashboard/admin/analytics">Analytics</Link>
              </li>

              <div className="divider"></div>

              <li>
                <Link href="/">Back to Home</Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </AdminRoute>
  );
}

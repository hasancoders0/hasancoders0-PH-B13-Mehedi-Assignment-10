import Link from "next/link";

import DoctorRoute from "@/middleware/DoctorRoute";

export default function DoctorLayout({ children }) {
  return (
    <DoctorRoute>
      <div className="drawer lg:drawer-open">
        <input id="doctor-sidebar" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-6">
          <label
            htmlFor="doctor-sidebar"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          >
            Menu
          </label>

          {children}
        </div>

        <div className="drawer-side">
          <label htmlFor="doctor-sidebar" className="drawer-overlay"></label>

          <aside className="w-72 min-h-full bg-base-200 p-5">
            <h2 className="text-2xl font-bold mb-8">Doctor Panel</h2>

            <ul className="menu space-y-2">
              <li>
                <Link href="/dashboard/doctor">Dashboard</Link>
              </li>

              <li>
                <Link href="/dashboard/doctor/requests">
                  Appointment Requests
                </Link>
              </li>

              <li>
                <Link href="/dashboard/doctor/schedule">Manage Schedule</Link>
              </li>

              <li>
                <Link href="/dashboard/doctor/prescriptions">
                  Prescriptions
                </Link>
              </li>

              <li>
                <Link href="/dashboard/doctor/profile">My Profile</Link>
              </li>

              <div className="divider"></div>

              <li>
                <Link href="/">Back to Home</Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </DoctorRoute>
  );
}

import Link from "next/link";

import PatientRoute from "@/middleware/PatientRoute";

export default function PatientLayout({ children }) {
  return (
    <PatientRoute>
      <div className="drawer lg:drawer-open">
        <input id="patient-sidebar" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-6">
          <label
            htmlFor="patient-sidebar"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          >
            Menu
          </label>

          {children}
        </div>

        <div className="drawer-side">
          <label htmlFor="patient-sidebar" className="drawer-overlay"></label>

          <aside className="w-72 min-h-full bg-base-200 p-5">
            <h2 className="text-2xl font-bold mb-8">Patient Panel</h2>

            <ul className="menu space-y-2">
              <li>
                <Link href="/dashboard/patient">Dashboard</Link>
              </li>

              <li>
                <Link href="/dashboard/patient/appointments">
                  My Appointments
                </Link>
              </li>

              <li>
                <Link href="/dashboard/patient/payments">Payment History</Link>
              </li>

              <li>
                <Link href="/dashboard/patient/prescriptions">
                  My Prescriptions
                </Link>
              </li>

              <li>
                <Link href="/dashboard/patient/reviews">My Reviews</Link>
              </li>

              <li>
                <Link href="/dashboard/patient/profile">My Profile</Link>
              </li>

              <div className="divider"></div>

              <li>
                <Link href="/">Back to Home</Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </PatientRoute>
  );
}

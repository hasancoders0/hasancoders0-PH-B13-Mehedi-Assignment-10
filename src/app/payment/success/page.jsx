"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const appointmentId = searchParams.get("appointment");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl border w-full max-w-xl">
        <div className="card-body text-center">
          <div className="text-6xl">✅</div>

          <h1 className="text-3xl font-bold text-success">
            Payment Successful
          </h1>

          <p className="text-base-content/70">
            Your appointment payment has been completed successfully.
          </p>

          {appointmentId && (
            <div className="alert alert-success mt-4">
              <span>
                Appointment ID:
                <strong> {appointmentId}</strong>
              </span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href="/dashboard/patient/appointments"
              className="btn btn-primary"
            >
              My Appointments
            </Link>

            <Link href="/dashboard/patient" className="btn btn-outline">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

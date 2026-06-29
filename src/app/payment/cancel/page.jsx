"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl border w-full max-w-xl">
        <div className="card-body text-center">
          <div className="text-6xl">❌</div>

          <h1 className="text-3xl font-bold text-error">Payment Cancelled</h1>

          <p className="text-base-content/70">
            Your payment was cancelled. No amount has been charged.
          </p>

          <div className="alert alert-warning mt-4">
            <span>
              You can return to your appointments and complete the payment
              later.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href="/dashboard/patient/appointments"
              className="btn btn-primary"
            >
              Back to Appointments
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

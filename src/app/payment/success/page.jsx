"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
  FaTachometerAlt,
} from "react-icons/fa";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-2xl shadow-base-300/20 p-10 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-bounce">
            <FaCheckCircle className="text-4xl text-success" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-success">
            Payment Successful
          </h1>

          <p className="text-sm text-base-content/50 font-light leading-7 mt-4 max-w-sm mx-auto">
            Your appointment payment has been completed successfully. You will
            receive a confirmation shortly.
          </p>

          {appointmentId && (
            <div className="mt-8 bg-success/5 border border-success/20 rounded-2xl px-5 py-4 inline-flex items-center gap-3">
              <FaCalendarAlt className="text-success text-lg shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold uppercase tracking-widest text-success/60">
                  Appointment ID
                </p>
                <p className="text-sm font-semibold text-success mt-0.5 font-mono">
                  {appointmentId}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
            <Link
              href="/dashboard/patient/appointments"
              className="btn btn-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 gap-2"
            >
              My Appointments
              <FaArrowRight className="text-sm" />
            </Link>

            <Link
              href="/dashboard/patient"
              className="btn btn-sm bg-base-200 text-base-content border-0 hover:bg-base-300 gap-2 rounded-xl transition-colors duration-200"
            >
              <FaTachometerAlt className="text-sm" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

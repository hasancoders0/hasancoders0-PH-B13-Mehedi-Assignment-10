"use client";

import Link from "next/link";
import {
  FaTimesCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaTachometerAlt,
} from "react-icons/fa"; 


export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-error/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-2xl shadow-base-300/20 p-10 text-center">
          {/* Error Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6 animate-bounce">
            <FaTimesCircle className="text-4xl text-error" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-error">
            Payment Cancelled
          </h1>

          <p className="text-sm text-base-content/50 font-light leading-7 mt-4 max-w-sm mx-auto">
            Your payment was cancelled. No amount has been charged from your
            account.
          </p>

          {/* Warning Box */}
          <div className="mt-8 bg-warning/5 border border-warning/20 rounded-2xl px-5 py-4 inline-flex items-center gap-3">
            <FaExclamationTriangle className="text-warning text-lg shrink-0" />
            <div className="text-left">
              <p className="text-sm text-warning/80 font-light leading-relaxed">
                You can return to your appointments and complete the payment
                later.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
            <Link
              href="/dashboard/patient/appointments"
              className="btn btn-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 gap-2"
            >
              Back to Appointments
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

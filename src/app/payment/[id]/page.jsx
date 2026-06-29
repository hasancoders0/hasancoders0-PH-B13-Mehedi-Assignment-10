"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaMoneyCheckDollar,
  FaStethoscope,
  FaCalendarDays,
  FaShieldHalved,
} from "react-icons/fa6";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "@/components/forms/CheckoutForm";

import { createPaymentIntent } from "@/services/payment.service";
import { getAppointmentById } from "@/services/appointment.service";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function PaymentPage() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAppointmentById(id);
        setAppointment(data);

        const secret = await createPaymentIntent(50);
        setClientSecret(secret);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading || !appointment || !clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 py-16 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-2xl shadow-base-300/20 overflow-hidden">
          <div className="p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <FaMoneyCheckDollar className="text-2xl text-primary" />
              </div>

              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
                Pay for Appointment
              </h1>

              <p className="text-sm opacity-50 mt-1 font-light">
                Complete your payment securely via Stripe
              </p>
            </div>

            {/* Appointment Info Card */}
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FaStethoscope className="text-sm text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
                      Doctor
                    </p>
                    <p className="font-semibold text-sm mt-0.5 truncate">
                      {appointment.doctorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FaCalendarDays className="text-sm text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
                      Date
                    </p>
                    <p className="font-semibold text-sm mt-0.5">
                      {appointment.appointmentDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Divider */}
              <div className="mt-6 pt-5 border-t border-base-300/50 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  Total Amount
                </p>
                <p className="text-3xl font-extrabold tracking-tight text-primary">
                  $50
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs opacity-40 mb-8 font-light">
              <FaShieldHalved className="text-sm" />
              <span>256-bit SSL Secured by Stripe</span>
            </div>

            {/* Stripe Form Wrapper */}
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} appointmentId={id} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
}

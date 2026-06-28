"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "@/components/forms/CheckoutForm";

import { createPaymentIntent } from "@/services/payment.service";
import { getAppointmentById } from "@/services/appointment.service";

const stripePromise = loadStripe(
  process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] =
    useState("");

  const [appointment, setAppointment] =
    useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data =
        await getAppointmentById(id);

      setAppointment(data);

      const secret =
        await createPaymentIntent(50);

      setClientSecret(secret);
    };

    if (id) {
      loadData();
    }
  }, [id]);

  if (!appointment || !clientSecret) {
    return (
      <div className="text-center py-20">
        Loading payment...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-20">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Pay for Appointment
          </h1>

          <p className="mt-3">
            Doctor:
            {" "}
            {appointment.doctorName}
          </p>

          <p>
            Date:
            {" "}
            {appointment.appointmentDate}
          </p>

          <p className="mb-6">
            Amount:
            {" "}
            $50
          </p>

          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm
              clientSecret={clientSecret}
              appointmentId={id}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
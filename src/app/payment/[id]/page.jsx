"use client";

import { useEffect, useState } from "react";

import {
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "@/components/forms/CheckoutForm";

import { createPaymentIntent } from "@/services/payment.service";

const stripePromise = loadStripe(
  process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] =
    useState("");

  useEffect(() => {
    createPaymentIntent(50).then(
      setClientSecret
    );
  }, []);

  if (!clientSecret) {
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
          <h1 className="text-3xl font-bold mb-6">
            Complete Payment
          </h1>

          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
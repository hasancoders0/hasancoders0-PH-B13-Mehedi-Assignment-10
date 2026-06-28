"use client";

import { useState } from "react";

import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({
  clientSecret,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !stripe ||
      !elements ||
      !clientSecret
    )
      return;

    setLoading(true);
    setMessage("");

    const card =
      elements.getElement(CardElement);

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

    if (error) {
      setMessage(error.message);
    } else if (
      paymentIntent.status ===
      "succeeded"
    ) {
      setMessage(
        "✅ Payment successful!"
      );
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="border rounded-lg p-4">
        <CardElement />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading
          ? "Processing..."
          : "Pay $50"}
      </button>

      {message && (
        <p className="text-center">
          {message}
        </p>
      )}
    </form>
  );
}
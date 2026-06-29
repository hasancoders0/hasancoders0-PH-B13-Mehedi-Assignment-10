"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { confirmPayment } from "@/services/appointment.service";

export default function CheckoutForm({
  clientSecret,
  appointmentId,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

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
    ) {
      return;
    }

    setLoading(true);

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
      await confirmPayment(
        appointmentId
      );

      toast.success("Payment successful!");

      router.push(
        "/dashboard/patient"
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
        <p className="text-red-500">
          {message}
        </p>
      )}
    </form>
  );
}
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createPaymentIntent = async (amount) => {
  const { data } = await axios.post(
    `${API_URL}/api/payments/create-payment-intent`,
    {
      amount,
    },
  );

  return data.clientSecret;
};

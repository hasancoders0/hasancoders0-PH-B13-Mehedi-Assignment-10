"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";

export default function RegisterPage() {
  const { createUser, googleLogin } = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await createUser(name, email, password);

      form.reset();

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto py-20 px-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Register
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-6"
          >
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Register
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mt-4"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold"
            >
              Login
            </Link>
          </p>

          {error && (
            <p className="text-error text-sm mt-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
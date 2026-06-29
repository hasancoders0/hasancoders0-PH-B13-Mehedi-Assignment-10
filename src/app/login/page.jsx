"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { loginUser, googleLogin } = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

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
    <section className="max-w-lg mx-auto py-20 px-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>

          {error && <p className="text-error text-center text-sm">{error}</p>}

          <div className="divider">Demo Accounts</div>

          <div className="space-y-4">
            <div className="border rounded-xl p-4 bg-base-200">
              <h3 className="font-bold text-primary mb-2">👤 Patient</h3>

              <p>
                <strong>Email:</strong>{" "}
                <span className="font-mono text-sm">
                  mehedi.jssit@gmail.com
                </span>
              </p>

              <p>
                <strong>Password:</strong>{" "}
                <span className="font-mono">123456</span>
              </p>
            </div>

            <div className="border rounded-xl p-4 bg-base-200">
              <h3 className="font-bold text-success mb-2">🩺 Doctor</h3>

              <p>
                <strong>Email:</strong>{" "}
                <span className="font-mono text-sm">john.doctor@gmail.com</span>
              </p>

              <p>
                <strong>Password:</strong>{" "}
                <span className="font-mono">123456</span>
              </p>
            </div>

            <div className="border rounded-xl p-4 bg-base-200">
              <h3 className="font-bold text-error mb-2">🛡️ Admin</h3>

              <p>
                <strong>Email:</strong>{" "}
                <span className="font-mono text-sm">admin@medicare.com</span>
              </p>

              <p>
                <strong>Password:</strong>{" "}
                <span className="font-mono">123456</span>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            These demo accounts are provided for assignment evaluation purposes
            only.
          </p>
        </div>
      </div>
    </section>
  );
}

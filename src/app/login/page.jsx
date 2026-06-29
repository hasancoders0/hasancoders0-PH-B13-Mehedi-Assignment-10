"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiArrowRightOnRectangle,
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";

import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { loginUser, googleLogin } = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-100 px-4 py-12 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-2xl shadow-base-300/20 p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <HiArrowRightOnRectangle className="text-2xl text-primary" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              Welcome Back
            </h1>

            <p className="text-sm opacity-50 mt-1 font-light">
              Login to your MediCare account
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-error/10 border border-error/20 text-error rounded-xl p-3 text-sm text-center mb-6 font-medium transition-all duration-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Email Address
                </span>
              </label>

              <div className="relative">
                <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />

                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Password
                </span>
              </label>

              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10 rounded-xl focus:input-primary transition-colors duration-200"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10 hover:text-base-content/60 transition-colors"
                >
                  {showPassword ? (
                    <HiEyeSlash className="text-lg" />
                  ) : (
                    <HiEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs opacity-40 uppercase tracking-widest my-6 before:bg-base-300 after:bg-base-300">
            or continue with
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full rounded-xl gap-2 hover:bg-base-200 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-6 opacity-70">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-base-100/60 backdrop-blur-sm border border-base-300/40 rounded-3xl p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-center opacity-40 mb-4">
            Demo Accounts
          </p>

          <div className="space-y-3">
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-bold text-sm text-primary">Patient</h3>
              </div>

              <div className="text-xs space-y-1 opacity-60 font-mono pl-4">
                <p>mehedi.jssit@gmail.com</p>
                <p>123456</p>
              </div>
            </div>

            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <h3 className="font-bold text-sm text-success">Doctor</h3>
              </div>

              <div className="text-xs space-y-1 opacity-60 font-mono pl-4">
                <p>john.doctor@gmail.com</p>
                <p>123456</p>
              </div>
            </div>

            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-4 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                <h3 className="font-bold text-sm text-error">Admin</h3>
              </div>

              <div className="text-xs space-y-1 opacity-60 font-mono pl-4">
                <p>admin@medicare.com</p>
                <p>123456</p>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-primary/70 text-xl z-10 mt-4 font-light">
            Provided for evaluation purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}

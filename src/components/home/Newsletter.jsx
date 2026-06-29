"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import {
  HiEnvelope,
  HiCheckCircle,
  HiArrowRight,
  HiSparkles,
} from "react-icons/hi2";

const perks = [
  "Weekly healthcare tips",
  "New specialist updates",
  "No spam, unsubscribe anytime",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate brief delay for feedback
    await new Promise((resolve) => setTimeout(resolve, 400));

    toast.success("Thanks for subscribing to MediCare updates!");
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 p-8 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-7">
                    <HiEnvelope className="text-lg" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                      Newsletter
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                    Stay Updated
                    <br />
                    With Healthcare
                    <br />
                    <span className="text-white/50">News</span>
                  </h2>

                  <p className="mt-6 text-white/60 leading-8 text-sm font-light max-w-sm">
                    Subscribe to receive health tips, doctor updates, wellness
                    articles, and important announcements from MediCare.
                  </p>

                  <div className="mt-9 space-y-3.5">
                    {perks.map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-3 text-white/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                          <HiCheckCircle className="text-sm text-white/90" />
                        </div>
                        <span className="text-sm font-light">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Form Card */}
                <div className="bg-base-100 text-base-content rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/10">
                  <div className="flex items-center gap-2 mb-2">
                    <HiSparkles className="text-primary text-xl" />
                    <h3 className="text-xl font-bold tracking-tight">
                      Join Our Community
                    </h3>
                  </div>

                  <p className="text-sm opacity-50 font-light leading-relaxed mb-7">
                    Get healthcare insights delivered directly to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-xs font-medium opacity-60">
                          Email Address
                        </span>
                      </label>

                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="input input-bordered w-full rounded-xl focus:input-primary transition-colors duration-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary w-full rounded-xl gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        <>
                          Subscribe Now
                          <HiArrowRight className="text-lg" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[11px] opacity-30 mt-5 text-center font-light">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

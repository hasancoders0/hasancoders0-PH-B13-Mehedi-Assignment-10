"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  HiEnvelope,
  HiCheckCircle,
} from "react-icons/hi2";

export default function Newsletter() {
  const [email, setEmail] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    toast.success(
      "Thanks for subscribing to MediCare updates!"
    );

    setEmail("");
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="max-w-5xl mx-auto">

          <div className="card bg-primary text-primary-content shadow-2xl overflow-hidden">

            <div className="card-body p-8 lg:p-14">

              <div className="grid lg:grid-cols-2 gap-10 items-center">

                {/* Left Content */}

                <div>

                  <div className="flex items-center gap-3 mb-5">

                    <HiEnvelope className="text-4xl" />

                    <span className="badge badge-outline border-white text-white">
                      Newsletter
                    </span>

                  </div>

                  <h2 className="text-4xl font-bold leading-tight">
                    Stay Updated With
                    <br />
                    Healthcare News
                  </h2>

                  <p className="mt-5 text-primary-content/80 leading-7">
                    Subscribe to receive health
                    tips, doctor updates, wellness
                    articles, and important
                    announcements from MediCare.
                  </p>

                  <div className="mt-8 space-y-3">

                    <div className="flex items-center gap-3">
                      <HiCheckCircle />

                      <span>
                        Weekly healthcare tips
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <HiCheckCircle />

                      <span>
                        New specialist updates
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <HiCheckCircle />

                      <span>
                        No spam, unsubscribe anytime
                      </span>
                    </div>

                  </div>

                </div>

                {/* Right Form */}

                <div className="bg-base-100 text-base-content rounded-3xl p-8 shadow-xl">

                  <h3 className="text-2xl font-bold mb-3">
                    Join Our Community
                  </h3>

                  <p className="opacity-70 mb-6">
                    Get healthcare insights
                    delivered directly to your inbox.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Subscribe Now
                    </button>

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
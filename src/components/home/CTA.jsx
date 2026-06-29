"use client";

import Link from "next/link";
import {
  HiArrowRight,
  HiCalendarDays,
} from "react-icons/hi2";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-primary to-secondary text-white">

          {/* Background Decorations */}

          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-white/10"></div>

          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center p-10 lg:p-16">

            {/* Left */}

            <div>

              <span className="badge badge-outline border-white text-white mb-5">
                Book Your Appointment Today
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Your Health Deserves
                <br />
                the Best Care
              </h2>

              <p className="mt-6 text-lg text-white/90 leading-8 max-w-xl">
                Connect with experienced doctors,
                schedule appointments online,
                receive digital prescriptions and
                manage your healthcare from one
                secure platform.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  href="/find-doctors"
                  className="btn btn-neutral"
                >
                  Find Doctors

                  <HiArrowRight />
                </Link>

                <Link
                  href="/register"
                  className="btn btn-outline border-white text-white hover:text-primary"
                >
                  Create Account
                </Link>

              </div>

            </div>

            {/* Right */}

            <div className="flex justify-center">

              <div className="bg-white text-base-content rounded-3xl shadow-2xl p-8 w-full max-w-sm">

                <div className="flex justify-center">

                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

                    <HiCalendarDays className="text-5xl text-primary" />

                  </div>

                </div>

                <h3 className="text-2xl font-bold text-center mt-6">
                  Book in Minutes
                </h3>

                <p className="text-center opacity-70 mt-3">
                  Find the right specialist and
                  schedule your appointment with
                  just a few clicks.
                </p>

                <Link
                  href="/find-doctors"
                  className="btn btn-primary w-full mt-8"
                >
                  Book Appointment
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
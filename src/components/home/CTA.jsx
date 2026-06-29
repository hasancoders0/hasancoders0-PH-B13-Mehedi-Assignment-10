"use client";

import Link from "next/link";
import {
  HiArrowRight,
  HiCalendarDays,
  HiShieldCheck,
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
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 mb-7">
                Book Your Appointment Today
              </span>

              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Your Health Deserves
                <br />
                <span className="text-white/50">the Best Care</span>
              </h2>

              <p className="mt-6 text-base text-white/60 leading-8 font-light max-w-md">
                Connect with experienced doctors, schedule appointments online,
                receive digital prescriptions and manage your healthcare from
                one secure platform.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/find-doctors"
                  className="btn bg-white text-primary border-none hover:bg-white/90 shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 gap-2"
                >
                  Find Doctors
                  <HiArrowRight className="text-lg" />
                </Link>

                <Link
                  href="/register"
                  className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Create Account
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-center">
              <div className="bg-white text-base-content rounded-3xl shadow-2xl shadow-black/10 p-8 w-full max-w-sm border border-base-300/50">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <HiCalendarDays className="text-3xl text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-center mt-6">
                  Book in Minutes
                </h3>

                <p className="text-sm text-center opacity-50 font-light leading-7 mt-3">
                  Find the right specialist and schedule your appointment with
                  just a few clicks.
                </p>

                <div className="flex items-center justify-center gap-2 mt-5 text-xs opacity-40">
                  <HiShieldCheck className="text-base text-success" />
                  <span>Secure & Fast Process</span>
                </div>

                <Link
                  href="/find-doctors"
                  className="btn btn-primary w-full mt-7 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 gap-2"
                >
                  Book Appointment
                  <HiArrowRight className="text-lg" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
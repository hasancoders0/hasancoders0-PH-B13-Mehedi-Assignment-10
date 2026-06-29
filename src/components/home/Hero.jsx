"use client";

import Link from "next/link";
import {
  HiArrowRight,
  HiUserGroup,
  HiCalendar,
  HiHeart,
  HiShieldCheck,
} from "react-icons/hi2";

const stats = [
  {
    icon: HiUserGroup,
    value: "100+",
    label: "Expert Doctors",
    color: "primary",
  },
  {
    icon: HiCalendar,
    value: "5K+",
    label: "Appointments",
    color: "success",
  },
  {
    icon: HiHeart,
    value: "98%",
    label: "Success Rate",
    color: "error",
  },
];

const trustBadges = [
  { icon: HiShieldCheck, text: "HIPAA Compliant" },
  { icon: HiHeart, text: "Patient First" },
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-24 lg:py-36 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            {/* Trust badges */}
            <div className="flex items-center gap-3 mb-8">
              {trustBadges.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 text-xs font-medium opacity-60 bg-base-200 border border-base-300 rounded-full px-3.5 py-1.5"
                >
                  <Icon className="text-sm text-primary" />
                  {text}
                </span>
              ))}
            </div>

            <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-[1.1] tracking-tight">
              Your Health,
              <br />
              <span className="text-primary">Our Priority</span>
            </h1>

            <p className="text-lg opacity-60 mt-7 leading-8 max-w-lg font-light">
              Book appointments with experienced doctors, manage prescriptions,
              make secure payments, and receive quality healthcare services from
              anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/find-doctors"
                className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
              >
                Find Doctors
                <HiArrowRight className="text-xl" />
              </Link>

              <Link
                href="/about"
                className="btn btn-outline btn-lg gap-2 hover:bg-base-200 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-14">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-2xl px-5 py-4 min-w-[160px] shadow-sm"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`text-2xl text-${color}`} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold leading-none">{value}</h3>
                    <p className="text-xs opacity-50 mt-1 font-light">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:pl-8">
            {/* Background accent */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-success/10 rounded-[3rem] blur-sm" />

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-base-300/50 ring-1 ring-base-300/50">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200"
                alt="Healthcare professional"
                className="w-full h-[520px] lg:h-[600px] object-cover"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-base-100 shadow-xl shadow-base-300/40 rounded-2xl px-6 py-5 ring-1 ring-base-300/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-warning/10 flex items-center justify-center">
                  <span className="text-warning text-lg font-bold">★</span>
                </div>

                <div>
                  <h3 className="font-bold text-2xl leading-none">4.9</h3>
                  <p className="text-[11px] opacity-50 mt-1 font-light">
                    Patient Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Floating appointment card */}
            <div className="absolute -top-4 -right-4 lg:-right-8 bg-base-100 shadow-xl shadow-base-300/40 rounded-2xl px-5 py-4 ring-1 ring-base-300/50 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                  <HiCalendar className="text-success text-lg" />
                </div>

                <div>
                  <p className="text-xs font-semibold">Next Slot</p>
                  <p className="text-[11px] opacity-50 font-light">
                    Today, 2:30 PM
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

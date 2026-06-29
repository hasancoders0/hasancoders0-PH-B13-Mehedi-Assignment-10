"use client";

import {
  HiCalendarDays,
  HiCreditCard,
  HiShieldCheck,
  HiDocumentText,
  HiChatBubbleLeftRight,
  HiUserGroup,
} from "react-icons/hi2";

const features = [
  {
    icon: HiCalendarDays,
    title: "Easy Appointment",
    description:
      "Book appointments with your preferred doctor in just a few clicks.",
    color: "primary",
  },
  {
    icon: HiCreditCard,
    title: "Secure Payment",
    description:
      "Pay consultation fees securely using Stripe payment gateway.",
    color: "secondary",
  },
  {
    icon: HiShieldCheck,
    title: "Verified Doctors",
    description:
      "Consult experienced and verified healthcare professionals.",
    color: "success",
  },
  {
    icon: HiDocumentText,
    title: "Digital Prescription",
    description:
      "Receive prescriptions digitally after your consultation.",
    color: "accent",
  },
  {
    icon: HiChatBubbleLeftRight,
    title: "Patient Reviews",
    description:
      "Read genuine reviews before choosing your healthcare provider.",
    color: "info",
  },
  {
    icon: HiUserGroup,
    title: "Healthcare Management",
    description:
      "Manage appointments, payments, prescriptions and reviews from one dashboard.",
    color: "warning",
  },
];

export default function Features() {
  return (
    <section className="relative py-28 bg-base-200 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            Why Choose Us
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Everything You Need
            <br />
            <span className="text-base-content/40">For Better Healthcare</span>
          </h2>

          <p className="mt-6 text-base opacity-50 leading-8 font-light max-w-lg mx-auto">
            MediCare provides a complete healthcare management system for
            patients, doctors, and administrators.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <div
              key={index}
              className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-7 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className={`absolute inset-x-0 top-0 h-[3px] bg-${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />

              {/* Hover background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-${color}/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-${color}/15 transition-all duration-300`}
                >
                  <Icon className={`text-2xl text-${color}`} />
                </div>

                <h3 className="text-xl font-bold tracking-tight">{title}</h3>

                <p className="mt-3 text-sm opacity-50 leading-7 font-light">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
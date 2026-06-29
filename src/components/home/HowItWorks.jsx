"use client";

import {
  HiMagnifyingGlass,
  HiCalendarDays,
  HiCreditCard,
  HiUserPlus,
  HiDocumentText,
} from "react-icons/hi2";

const steps = [
  {
    icon: HiMagnifyingGlass,
    title: "Find a Doctor",
    description:
      "Search from our experienced specialists and choose the right doctor.",
  },
  {
    icon: HiCalendarDays,
    title: "Book Appointment",
    description:
      "Select your preferred date and time to schedule your appointment.",
  },
  {
    icon: HiCreditCard,
    title: "Pay Securely",
    description:
      "Complete your payment safely using our secure Stripe payment gateway.",
  },
  {
    icon: HiUserPlus,
    title: "Consult Doctor",
    description:
      "Meet your doctor and receive professional medical consultation.",
  },
  {
    icon: HiDocumentText,
    title: "Get Prescription",
    description:
      "Receive your digital prescription and review it anytime from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            How It Works
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Healthcare in Five
            <br />
            <span className="text-base-content/40">Simple Steps</span>
          </h2>

          <p className="mt-6 text-base opacity-50 leading-8 font-light max-w-lg mx-auto">
            Booking an appointment with MediCare is simple, fast, and secure.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative group px-2">
                {/* Dashed Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-[calc(50%+24px)] w-[calc(100%-48px)] border-t-2 border-dashed border-base-300/60 z-0" />
                )}

                {/* Step Card */}
                <div className="relative z-10 bg-base-100 border border-base-300/60 rounded-3xl p-6 pt-8 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 h-full text-center flex flex-col items-center overflow-hidden">
                  {/* Hover top accent */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300 shadow-sm">
                    <Icon className="text-2xl text-primary" />
                  </div>

                  {/* Step Number */}
                  <span className="relative z-10 text-[11px] font-bold text-primary/60 uppercase tracking-widest mb-2">
                    Step 0{index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="relative z-10 text-base font-bold tracking-tight mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-sm opacity-50 font-light leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
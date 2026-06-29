"use client";

import {
  HiMagnifyingGlass,
  HiCalendarDays,
  HiCreditCard,
  HiUserPlus,
  HiDocumentText,
} from "react-icons/hi2";

export default function HowItWorks() {
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

  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="badge badge-primary badge-lg mb-4">
            How It Works
          </span>

          <h2 className="text-4xl font-bold">
            Healthcare in Five Simple Steps
          </h2>

          <p className="mt-5 opacity-70">
            Booking an appointment with MediCare is
            simple, fast, and secure.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative"
              >
                <div className="card bg-base-100 shadow border hover:shadow-xl transition h-full">

                  <div className="card-body items-center text-center">

                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

                      <Icon className="text-4xl text-primary" />

                    </div>

                    <div className="badge badge-primary mt-5">
                      Step {index + 1}
                    </div>

                    <h3 className="text-xl font-bold mt-3">
                      {step.title}
                    </h3>

                    <p className="opacity-70">
                      {step.description}
                    </p>

                  </div>

                </div>

                {index !== steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-20 -right-8 w-16 justify-center">
                    <span className="text-4xl text-primary">
                      →
                    </span>
                  </div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
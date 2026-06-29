"use client";

import {
  HiCalendarDays,
  HiCreditCard,
  HiShieldCheck,
  HiDocumentText,
  HiChatBubbleLeftRight,
  HiUserGroup,
} from "react-icons/hi2";

export default function Features() {
  const features = [
    {
      icon: HiCalendarDays,
      title: "Easy Appointment",
      description:
        "Book appointments with your preferred doctor in just a few clicks.",
    },
    {
      icon: HiCreditCard,
      title: "Secure Payment",
      description:
        "Pay consultation fees securely using Stripe payment gateway.",
    },
    {
      icon: HiShieldCheck,
      title: "Verified Doctors",
      description:
        "Consult experienced and verified healthcare professionals.",
    },
    {
      icon: HiDocumentText,
      title: "Digital Prescription",
      description:
        "Receive prescriptions digitally after your consultation.",
    },
    {
      icon: HiChatBubbleLeftRight,
      title: "Patient Reviews",
      description:
        "Read genuine reviews before choosing your healthcare provider.",
    },
    {
      icon: HiUserGroup,
      title: "Healthcare Management",
      description:
        "Manage appointments, payments, prescriptions and reviews from one dashboard.",
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-14">

          <span className="badge badge-primary badge-lg mb-4">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold">
            Everything You Need For Better Healthcare
          </h2>

          <p className="mt-5 opacity-70 leading-7">
            MediCare provides a complete healthcare
            management system for patients, doctors,
            and administrators.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="card bg-base-100 shadow hover:shadow-xl transition-all duration-300 border hover:-translate-y-2"
              >
                <div className="card-body">

                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">

                    <Icon className="text-4xl text-primary" />

                  </div>

                  <h3 className="text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="opacity-70 leading-7">
                    {feature.description}
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
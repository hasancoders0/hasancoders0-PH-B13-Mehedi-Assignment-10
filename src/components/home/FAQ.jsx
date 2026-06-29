"use client";

import { HiQuestionMarkCircle } from "react-icons/hi2";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Simply browse doctors, choose your preferred specialist, select an available date and time, and confirm your booking.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes. Patients can cancel or reschedule appointments directly from their dashboard before the appointment is completed.",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Absolutely. We use Stripe for secure payment processing, ensuring your card information is protected.",
  },
  {
    question: "How will I receive my prescription?",
    answer:
      "After the consultation, doctors can create digital prescriptions which are available from your patient dashboard.",
  },
  {
    question: "Can I review a doctor after my appointment?",
    answer:
      "Yes. Once an appointment is completed, patients can submit ratings and reviews for their doctors.",
  },
  {
    question: "Can doctors manage their own profiles?",
    answer:
      "Yes. Doctors can update their profile information, schedules, experience, consultation fees, and other details.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-base-200 to-base-100 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            FAQ
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Frequently Asked
            <br />
            <span className="text-base-content/40">Questions</span>
          </h2>

          <p className="mt-6 text-base opacity-50 leading-8 font-light max-w-lg mx-auto">
            Find answers to common questions about appointments, payments,
            prescriptions, and healthcare services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-base-100 border border-base-300/60 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-base-300/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden collapse collapse-arrow"
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20 pointer-events-none" />

              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />

              <div className="collapse-title flex items-center gap-4 py-5 px-6 lg:px-8 text-base font-semibold">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                  <HiQuestionMarkCircle className="text-xl text-primary" />
                </div>
                <span className="tracking-tight">{faq.question}</span>
              </div>

              <div className="collapse-content">
                <p className="text-sm opacity-50 leading-7 font-light pl-14 pr-6 pb-6 lg:pr-8 lg:pb-7">
                  {faq.answer}
                </p>
              </div>

              {/* Custom Arrow Color Overrides */}
              <style jsx>{`
                .group:hover .collapse-arrow {
                  color: var(--color-primary);
                }
                .collapse-arrow {
                  color: oklch(var(--bc) / 0.2);
                  transition: color 0.3s ease;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

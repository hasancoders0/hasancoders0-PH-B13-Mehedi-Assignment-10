"use client";

import {
  HiQuestionMarkCircle,
} from "react-icons/hi2";

export default function FAQ() {
  const faqs = [
    {
      question:
        "How do I book an appointment?",
      answer:
        "Simply browse doctors, choose your preferred specialist, select an available date and time, and confirm your booking.",
    },
    {
      question:
        "Can I cancel or reschedule my appointment?",
      answer:
        "Yes. Patients can cancel or reschedule appointments directly from their dashboard before the appointment is completed.",
    },
    {
      question:
        "Is online payment secure?",
      answer:
        "Absolutely. We use Stripe for secure payment processing, ensuring your card information is protected.",
    },
    {
      question:
        "How will I receive my prescription?",
      answer:
        "After the consultation, doctors can create digital prescriptions which are available from your patient dashboard.",
    },
    {
      question:
        "Can I review a doctor after my appointment?",
      answer:
        "Yes. Once an appointment is completed, patients can submit ratings and reviews for their doctors.",
    },
    {
      question:
        "Can doctors manage their own profiles?",
      answer:
        "Yes. Doctors can update their profile information, schedules, experience, consultation fees, and other details.",
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-3xl mx-auto mb-14">

          <span className="badge badge-primary badge-lg mb-4">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl font-bold">
            Have Questions?
          </h2>

          <p className="mt-5 opacity-70">
            Find answers to common questions about
            appointments, payments, prescriptions,
            and healthcare services.
          </p>

        </div>

        <div className="max-w-4xl mx-auto space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 border shadow-sm"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />

              <div className="collapse-title flex items-center gap-3 text-lg font-semibold">

                <HiQuestionMarkCircle className="text-primary text-2xl flex-shrink-0" />

                {faq.question}

              </div>

              <div className="collapse-content">
                <p className="opacity-80 leading-7 pl-9">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
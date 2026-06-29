"use client";

import toast from "react-hot-toast";
import {
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiClock,
  HiQuestionMarkCircle,
  HiPaperAirplane,
} from "react-icons/hi2";

const contactInfo = [
  {
    icon: HiPhone,
    title: "Phone",
    details: ["+880 1700-000000"],
    color: "primary",
  },
  {
    icon: HiEnvelope,
    title: "Email",
    details: ["support@medicareconnect.com"],
    color: "secondary",
  },
  {
    icon: HiMapPin,
    title: "Address",
    details: ["Dhaka, Bangladesh"],
    color: "success",
  },
  {
    icon: HiClock,
    title: "Working Hours",
    details: ["Saturday - Thursday", "9:00 AM - 8:00 PM"],
    color: "warning",
  },
];

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Browse available doctors, choose your preferred date and time, and complete your booking online.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes. Patients and doctors can reschedule or cancel appointments directly from their dashboards.",
  },
  {
    question: "Are online payments secure?",
    answer:
      "Yes. We use Stripe payment integration to ensure secure and reliable transactions.",
  },
  {
    question: "How can I access my prescriptions?",
    answer:
      "Digital prescriptions are available from your patient dashboard after the doctor completes your appointment.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can use the contact form above or email us at support@medicareconnect.com.",
  },
];

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    e.target.reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 overflow-hidden py-28">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            Get In Touch
          </span>

          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base lg:text-lg opacity-50 leading-8 font-light mt-6">
            Have questions about appointments, payments, or healthcare services?
            Our support team is here to help you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Let&apos;s Connect
              </h2>
              <p className="mt-3 text-sm opacity-50 font-light leading-7">
                Feel free to reach out to us anytime. We will get back to you as
                soon as possible.
              </p>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group flex items-start gap-4 bg-base-100 border border-base-300/60 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-base-300/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-${item.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`text-xl text-${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm tracking-tight">
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-sm opacity-50 font-light mt-0.5"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 border border-base-300/60 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:shadow-base-300/40 transition-shadow duration-300 h-full">
              <h2 className="text-2xl font-bold tracking-tight mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xs font-medium opacity-60">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full rounded-xl focus:input-primary transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xs font-medium opacity-60">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full rounded-xl focus:input-primary transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-medium opacity-60">
                      Subject
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="input input-bordered w-full rounded-xl focus:input-primary transition-colors duration-200"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-medium opacity-60">
                      Message
                    </span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    className="textarea textarea-bordered w-full rounded-xl focus:textarea-primary transition-colors duration-200 leading-7"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary gap-2 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  Send Message
                  <HiPaperAirplane className="text-lg -rotate-12" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              Location
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Find Us On The Map
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden border border-base-300/60 shadow-sm">
            <iframe
              title="Google Map"
              className="w-full h-[450px]"
              loading="lazy"
              src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-28 bg-gradient-to-b from-base-200 to-base-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              FAQ
            </span>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Frequently Asked
              <br />
              <span className="text-base-content/40">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group relative bg-base-100 border border-base-300/60 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-base-300/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden collapse collapse-arrow"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20 pointer-events-none" />

                <input
                  type="radio"
                  name="contact-faq"
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
    </div>
  );
}

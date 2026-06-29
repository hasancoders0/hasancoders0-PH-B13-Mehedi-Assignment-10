"use client";
import toast from "react-hot-toast";
export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Your message has been sent successfully!");

    e.target.reset();
  };

  return (
    <div>
      {/* Hero Section */}

      <section className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>

          <p className="max-w-3xl mx-auto text-lg opacity-80">
            Have questions about appointments, payments, or healthcare services?
            Our support team is here to help you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          {/* Contact Information */}

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Get In Touch</h2>

            <p className="opacity-70">
              Feel free to contact us anytime. We will respond as soon as
              possible.
            </p>

            <div className="grid gap-4">
              <div className="card bg-base-100 shadow border">
                <div className="card-body">
                  <h3 className="font-bold text-lg">📞 Phone</h3>

                  <p>+880 1700-000000</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow border">
                <div className="card-body">
                  <h3 className="font-bold text-lg">📧 Email</h3>

                  <p>support@medicareconnect.com</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow border">
                <div className="card-body">
                  <h3 className="font-bold text-lg">📍 Address</h3>

                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="card bg-base-100 shadow border">
                <div className="card-body">
                  <h3 className="font-bold text-lg">🕒 Working Hours</h3>

                  <p>Saturday - Thursday</p>

                  <p>9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                  required
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                  required
                />

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>

          <iframe
            title="Google Map"
            className="w-full h-[450px] rounded-2xl border"
            loading="lazy"
            src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-base-200 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq" defaultChecked />

              <div className="collapse-title font-semibold">
                How do I book an appointment?
              </div>

              <div className="collapse-content">
                Browse available doctors, choose your preferred date and time,
                and complete your booking online.
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq" />

              <div className="collapse-title font-semibold">
                Can I cancel or reschedule an appointment?
              </div>

              <div className="collapse-content">
                Yes. Patients and doctors can reschedule or cancel appointments
                directly from their dashboards.
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq" />

              <div className="collapse-title font-semibold">
                Are online payments secure?
              </div>

              <div className="collapse-content">
                Yes. We use Stripe payment integration to ensure secure and
                reliable transactions.
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq" />

              <div className="collapse-title font-semibold">
                How can I access my prescriptions?
              </div>

              <div className="collapse-content">
                Digital prescriptions are available from your patient dashboard
                after the doctor completes your appointment.
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border">
              <input type="radio" name="faq" />

              <div className="collapse-title font-semibold">
                How do I contact support?
              </div>

              <div className="collapse-content">
                You can use the contact form above or email us at
                support@medicareconnect.com.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

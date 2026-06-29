import Link from "next/link";

export default function AboutPage() {
  const features = [
    "Verified & Experienced Doctors",
    "Online Appointment Booking",
    "Digital Prescriptions",
    "Secure Stripe Payments",
    "Patient Reviews & Ratings",
    "24/7 Healthcare Support",
  ];

  const stats = [
    {
      title: "Doctors",
      value: "100+",
    },
    {
      title: "Patients",
      value: "10K+",
    },
    {
      title: "Appointments",
      value: "5K+",
    },
    {
      title: "Satisfaction",
      value: "98%",
    },
  ];

  return (
    <div>
      {/* Hero Section */}

      <section className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About MediCare Connect</h1>

          <p className="max-w-3xl mx-auto text-lg opacity-80">
            MediCare Connect is a modern healthcare platform that helps patients
            connect with qualified doctors, book appointments, make secure
            online payments, receive digital prescriptions, and manage
            healthcare services from anywhere.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>

              <p className="leading-8 opacity-80">
                Our mission is to make healthcare more accessible, efficient,
                and secure through digital transformation. We aim to provide
                seamless appointment booking, transparent communication, online
                consultations, and convenient healthcare management for
                everyone.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>

              <p className="leading-8 opacity-80">
                We envision a future where patients can easily connect with
                trusted healthcare professionals and receive quality medical
                services through innovative digital solutions, regardless of
                their location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}

      <section className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Why Choose MediCare Connect?</h2>

            <p className="mt-4 opacity-70">
              We provide reliable and modern healthcare services for patients
              and doctors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature} className="card bg-base-100 shadow border">
                <div className="card-body">
                  <div className="text-3xl mb-2">✅</div>

                  <h3 className="font-semibold text-lg">{feature}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.title}
                className="card bg-primary text-primary-content shadow-xl"
              >
                <div className="card-body text-center">
                  <h3 className="text-5xl font-bold">{item.value}</h3>

                  <p className="text-lg mt-2">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-base-200 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Better Healthcare?
          </h2>

          <p className="opacity-80 mb-8">
            Book appointments with experienced doctors and manage your
            healthcare journey through MediCare Connect.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/doctors" className="btn btn-primary">
              Find Doctors
            </Link>

            <Link href="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

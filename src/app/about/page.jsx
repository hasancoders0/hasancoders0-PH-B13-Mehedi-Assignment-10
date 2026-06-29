import Link from "next/link";
import {
  HiUserGroup,
  HiCalendarDays,
  HiDocumentText,
  HiCreditCard,
  HiStar,
  HiShieldCheck,
  HiLightBulb,
  HiEye,
  HiHeart,
  HiArrowRight,
} from "react-icons/hi2";

const features = [
  {
    title: "Verified & Experienced Doctors",
    icon: HiUserGroup,
    color: "primary",
  },
  {
    title: "Online Appointment Booking",
    icon: HiCalendarDays,
    color: "secondary",
  },
  {
    title: "Digital Prescriptions",
    icon: HiDocumentText,
    color: "success",
  },
  {
    title: "Secure Stripe Payments",
    icon: HiCreditCard,
    color: "accent",
  },
  {
    title: "Patient Reviews & Ratings",
    icon: HiStar,
    color: "warning",
  },
  {
    title: "24/7 Healthcare Support",
    icon: HiShieldCheck,
    color: "info",
  },
];

const stats = [
  { title: "Doctors", value: "100+", icon: HiUserGroup, color: "primary" },
  {
    title: "Patients",
    value: "10K+",
    icon: HiCalendarDays,
    color: "secondary",
  },
  { title: "Appointments", value: "5K+", icon: HiHeart, color: "error" },
  { title: "Satisfaction", value: "98%", icon: HiStar, color: "warning" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 overflow-hidden py-28">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            About Us
          </span>

          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            About MediCare{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base lg:text-lg opacity-50 leading-8 font-light mt-6">
            MediCare Connect is a modern healthcare platform that helps patients
            connect with qualified doctors, book appointments, make secure
            online payments, receive digital prescriptions, and manage
            healthcare services from anywhere.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="text-2xl text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Our Mission
              </h2>
              <p className="leading-8 text-sm opacity-50 font-light">
                Our mission is to make healthcare more accessible, efficient,
                and secure through digital transformation. We aim to provide
                seamless appointment booking, transparent communication, online
                consultations, and convenient healthcare management for
                everyone.
              </p>
            </div>
          </div>

          <div className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiEye className="text-2xl text-secondary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Our Vision
              </h2>
              <p className="leading-8 text-sm opacity-50 font-light">
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
      <section className="py-24 bg-base-200 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Why Choose MediCare
              <br />
              <span className="text-base-content/40">Connect?</span>
            </h2>
            <p className="mt-6 text-base opacity-50 leading-8 font-light max-w-lg mx-auto">
              We provide reliable and modern healthcare services for patients
              and doctors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-7 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[3px] bg-${feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-base-100)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className={`text-xl text-${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 lg:p-8 text-center shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1 hover:border-base-content/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div
                      className={`mx-auto w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className={`text-2xl lg:text-3xl text-${item.color}`}
                      />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent">
                      {item.value}
                    </h2>
                    <p className="text-xs lg:text-sm opacity-50 mt-2 font-light tracking-wide uppercase">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-base-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center p-10 lg:p-20">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 mb-7">
                Get Started
              </span>

              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Ready to Experience
                <br />
                <span className="text-white/50">Better Healthcare?</span>
              </h2>

              <p className="mt-6 text-base text-white/60 leading-8 font-light max-w-lg mx-auto">
                Book appointments with experienced doctors and manage your
                healthcare journey through MediCare Connect.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link
                  href="/doctors"
                  className="btn bg-white text-primary border-none hover:bg-white/90 shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 gap-2"
                >
                  Find Doctors
                  <HiArrowRight className="text-lg" />
                </Link>

                <Link
                  href="/contact"
                  className="btn btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

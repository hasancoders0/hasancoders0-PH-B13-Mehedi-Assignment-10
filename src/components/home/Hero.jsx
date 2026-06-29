"use client";

import Link from "next/link";
import {
  HiArrowRight,
  HiUserGroup,
  HiCalendar,
} from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="bg-base-200 overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="badge badge-primary badge-lg mb-6">
              Trusted Healthcare Platform
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Health,
              <span className="text-primary">
                {" "}
                Our Priority
              </span>
            </h1>

            <p className="text-lg opacity-80 mt-6 leading-8 max-w-xl">
              Book appointments with experienced
              doctors, manage prescriptions, make
              secure payments, and receive quality
              healthcare services from anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/find-doctors"
                className="btn btn-primary btn-lg"
              >
                Find Doctors
                <HiArrowRight className="text-xl" />
              </Link>

              <Link
                href="/about"
                className="btn btn-outline btn-lg"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-14 max-w-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <HiUserGroup className="text-3xl text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    100+
                  </h3>

                  <p className="text-sm opacity-70">
                    Expert Doctors
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                  <HiCalendar className="text-3xl text-success" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    5K+
                  </h3>

                  <p className="text-sm opacity-70">
                    Appointments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200"
                alt="Healthcare"
                className="w-full h-[600px] object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 bg-base-100 shadow-xl rounded-3xl p-6">
              <h3 className="font-bold text-3xl text-primary">
                4.9★
              </h3>

              <p className="opacity-70">
                Patient Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Logo />

            <p className="mt-4 text-sm opacity-80 leading-7">
              MediCare is a modern healthcare platform that connects patients
              with trusted doctors for seamless appointment booking, online
              payments, prescriptions, and healthcare management.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="btn btn-circle btn-sm btn-outline">
                <FaFacebookF />
              </a>

              <a href="#" className="btn btn-circle btn-sm btn-outline">
                <FaTwitter />
              </a>

              <a href="#" className="btn btn-circle btn-sm btn-outline">
                <FaInstagram />
              </a>

              <a href="#" className="btn btn-circle btn-sm btn-outline">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/find-doctors"
                  className="hover:text-primary transition"
                >
                  Find Doctors
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-5">Services</h3>

            <ul className="space-y-3">
              <li>Doctor Appointments</li>

              <li>Online Payments</li>

              <li>Digital Prescriptions</li>

              <li>Healthcare Management</li>

              <li>Patient Reviews</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-5">Contact Info</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <FaPhoneAlt className="mt-1 text-primary" />

                <span>+880 1234-567890</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="mt-1 text-primary" />

                <span>support@medicare.com</span>
              </div>

              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary" />

                <span>
                  Dhanmondi, Dhaka,
                  <br />
                  Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <p>© {new Date().getFullYear()} MediCare. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

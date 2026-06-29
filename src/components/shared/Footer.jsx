"use client";

import Link from "next/link";
import {
  FaHeartbeat,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import Logo from "./Logo";

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/find-doctors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const patientServices = [
  { label: "Book Appointment", href: "/book-appointment" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reviews", href: "/reviews" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-base-200 to-base-300 border-t border-base-300 shadow-[0_-4px_30px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Logo />
              <FaHeartbeat className="text-primary text-xl animate-pulse" />
            </div>

            <p className="mt-5 text-sm opacity-70 leading-7 font-light">
              MediCare is a modern healthcare platform connecting patients with
              trusted doctors for seamless appointments, digital prescriptions,
              and smarter health management.
            </p>

            <div className="flex items-center gap-2.5 mt-7">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="btn btn-circle btn-sm btn-outline border-base-300 bg-base-100 hover:bg-primary hover:border-primary hover:text-primary-content hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-base-content/90">
              Quick Links
            </h3>

            <ul className="space-y-3.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary hover:pl-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-base-content/90">
              Patient Services
            </h3>

            <ul className="space-y-3.5">
              {patientServices.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary hover:pl-1 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-base-content/90">
              Contact Info
            </h3>

            <div className="space-y-5">
              <a
                href="tel:+8801234567890"
                className="flex items-start gap-3.5 group"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                  <FaPhone className="text-xs" />
                </span>
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed pt-1.5">
                  +880 1234-567890
                </span>
              </a>

              <a
                href="mailto:support@medicare.com"
                className="flex items-start gap-3.5 group"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                  <FaEnvelope className="text-xs" />
                </span>
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed pt-1.5">
                  support@medicare.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-10 before:bg-base-300 after:bg-base-300" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
          <p className="font-light">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="hover:opacity-100 hover:text-primary transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="hover:opacity-100 hover:text-primary transition-all duration-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

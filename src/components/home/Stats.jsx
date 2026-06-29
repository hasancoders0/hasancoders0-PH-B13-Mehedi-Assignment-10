"use client";

import { HiUserGroup, HiUsers, HiCalendarDays, HiStar } from "react-icons/hi2";

const stats = [
  {
    value: "100+",
    label: "Doctors",
    icon: HiUserGroup,
    color: "primary",
  },
  {
    value: "10K+",
    label: "Patients",
    icon: HiUsers,
    color: "secondary",
  },
  {
    value: "5K+",
    label: "Appointments",
    icon: HiCalendarDays,
    color: "accent",
  },
  {
    value: "4.9★",
    label: "Average Rating",
    icon: HiStar,
    color: "warning",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-100 to-base-200/50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map(({ value, label, icon: Icon, color }, index) => (
            <div
              key={label}
              className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 lg:p-8 text-center shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1 hover:border-base-content/10 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div
                  className={`mx-auto w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-${color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`text-2xl lg:text-3xl text-${color}`} />
                </div>

                <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent">
                  {value}
                </h2>

                <p className="text-xs lg:text-sm opacity-50 mt-2 font-light tracking-wide uppercase">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

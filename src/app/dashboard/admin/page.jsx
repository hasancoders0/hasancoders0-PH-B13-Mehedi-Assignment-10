"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaHospitalUser,
  FaUserDoctor,
  FaCalendarDays,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
  FaMoneyCheckDollar,
  FaStar,
} from "react-icons/fa6";

import { getDashboardStats } from "@/services/admin.service";

const statCards = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: FaUsers,
    color: "primary",
  },
  {
    key: "totalPatients",
    label: "Total Patients",
    icon: FaHospitalUser,
    color: "secondary",
  },
  {
    key: "totalDoctors",
    label: "Total Doctors",
    icon: FaUserDoctor,
    color: "accent",
  },
  {
    key: "totalAppointments",
    label: "Appointments",
    icon: FaCalendarDays,
    color: "info",
  },
  {
    key: "completedAppointments",
    label: "Completed",
    icon: FaCircleCheck,
    color: "success",
  },
  {
    key: "pendingAppointments",
    label: "Pending",
    icon: FaClock,
    color: "warning",
  },
  {
    key: "cancelledAppointments",
    label: "Cancelled",
    icon: FaCircleXmark,
    color: "error",
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: FaMoneyCheckDollar,
    color: "primary",
    prefix: "৳ ",
  },
  {
    key: "totalReviews",
    label: "Total Reviews",
    icon: FaStar,
    color: "warning",
  },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Overview of your platform performance and metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map(({ key, label, icon: Icon, color, prefix = "" }) => (
          <div
            key={key}
            className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 lg:p-7 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Hover accent line */}
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  {label}
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight mt-2 bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent">
                  {prefix}
                  {stats[key]}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`text-xl text-${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
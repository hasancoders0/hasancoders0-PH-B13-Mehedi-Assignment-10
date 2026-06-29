"use client";

import { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaClock,
  FaCircleCheck,
  FaFlagCheckered,
  FaMoneyCheckDollar,
  FaCircleDot,
  FaListCheck,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";
import { getDoctorAppointments } from "@/services/appointment.service";

const statCards = [
  {
    key: "total",
    label: "Total Appointments",
    icon: FaCalendarDays,
    color: "primary",
  },
  {
    key: "pending",
    label: "Pending",
    icon: FaClock,
    color: "warning",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: FaCircleCheck,
    color: "info",
  },
  {
    key: "completed",
    label: "Completed",
    icon: FaFlagCheckered,
    color: "success",
  },
  {
    key: "revenue",
    label: "Revenue",
    icon: FaMoneyCheckDollar,
    color: "primary",
    prefix: true,
  },
];

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      if (!user?.email) return;
      const data = await getDoctorAppointments(user.email);
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending",
  );

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed",
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed",
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "cancelled",
  );

  const totalRevenue = appointments
    .filter((appointment) => appointment.paymentStatus === "paid")
    .reduce(
      (total, appointment) =>
        total +
        Number(appointment.paidAmount || appointment.consultationFee || 0),
      0,
    );

  const getStatValue = (key) => {
    if (key === "total") return appointments.length;
    if (key === "pending") return pendingAppointments.length;
    if (key === "confirmed") return confirmedAppointments.length;
    if (key === "completed") return completedAppointments.length;
    if (key === "revenue") return `৳${totalRevenue}`;
    return 0;
  };

  const summaryItems = [
    {
      label: "Pending Requests",
      value: pendingAppointments.length,
      color: "warning",
    },
    {
      label: "Confirmed Appointments",
      value: confirmedAppointments.length,
      color: "info",
    },
    {
      label: "Completed Consultations",
      value: completedAppointments.length,
      color: "success",
    },
    {
      label: "Cancelled Appointments",
      value: cancelledAppointments.length,
      color: "error",
    },
  ];

  if (loading) {
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
          Doctor Dashboard
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Overview of your appointments and earnings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map(({ key, label, icon: Icon, color, prefix = false }) => (
          <div
            key={key}
            className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Hover accent line */}
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
                  {label}
                </p>
                <h3
                  className={`text-2xl lg:text-3xl font-extrabold tracking-tight mt-2 ${
                    prefix
                      ? "text-primary"
                      : "bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent"
                  }`}
                >
                  {getStatValue(key)}
                </h3>
              </div>

              <div
                className={`w-11 h-11 rounded-2xl bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`text-lg text-${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Summary Card */}
      <div className="mt-8 bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 hover:shadow-lg hover:shadow-base-300/30 transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaListCheck className="text-lg text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Quick Summary</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {summaryItems.map(({ label, value, color }) => (
            <div
              key={label}
              className="flex items-center justify-between bg-base-200/50 border border-base-300/30 rounded-2xl px-5 py-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                <FaCircleDot className={`text-sm text-${color}`} />
                <span className="text-sm font-medium opacity-70">{label}</span>
              </div>
              <span className={`text-lg font-extrabold text-${color}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

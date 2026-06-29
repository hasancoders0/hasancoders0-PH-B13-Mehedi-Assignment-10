"use client";

import { useEffect, useState } from "react";
import {
  FaMoneyCheckDollar,
  FaCalendarDays,
  FaStar,
  FaUserDoctor,
} from "react-icons/fa6";

import { getDashboardStats } from "@/services/admin.service";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#facc15", "#22c55e", "#ef4444"];

const statCards = [
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: FaMoneyCheckDollar,
    color: "primary",
  },
  {
    key: "totalAppointments",
    label: "Total Appointments",
    icon: FaCalendarDays,
    color: "info",
  },
  {
    key: "totalReviews",
    label: "Total Reviews",
    icon: FaStar,
    color: "warning",
  },
  {
    key: "totalDoctors",
    label: "Total Doctors",
    icon: FaUserDoctor,
    color: "success",
  },
];

export default function AdminAnalyticsPage() {
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

  const getStatValue = (key) => {
    if (key === "totalRevenue") return `৳${stats.totalRevenue}`;
    return stats[key];
  };

  const appointmentData = [
    { name: "Pending", value: stats.pendingAppointments },
    { name: "Completed", value: stats.completedAppointments },
    { name: "Cancelled", value: stats.cancelledAppointments },
  ];

  const overviewData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Doctors", value: stats.totalDoctors },
    { name: "Patients", value: stats.totalPatients },
    { name: "Reviews", value: stats.totalReviews },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Platform insights, revenue, users, and appointment statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map(({ key, label, icon: Icon, color }) => (
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
                  {getStatValue(key)}
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

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 hover:shadow-lg hover:shadow-base-300/30 transition-shadow duration-300">
          <h2 className="text-xl font-bold tracking-tight mb-6">
            Platform Overview
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} barSize={40}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(var(--bc) / 0.5)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(var(--bc) / 0.5)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--b1))",
                    border: "1px solid oklch(var(--bc) / 0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    color: "oklch(var(--bc))",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="oklch(var(--p) / 0.8)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 hover:shadow-lg hover:shadow-base-300/30 transition-shadow duration-300">
          <h2 className="text-xl font-bold tracking-tight mb-6">
            Appointment Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={4}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {appointmentData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(var(--b1))",
                    border: "1px solid oklch(var(--bc) / 0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    color: "oklch(var(--bc))",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span
                      style={{ color: "oklch(var(--bc) / 0.7)", fontSize: 12 }}
                    >
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

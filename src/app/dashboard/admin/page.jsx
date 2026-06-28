"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getDashboardStats } from "@/services/admin.service";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  const appointmentData = [
    {
      name: "Paid",
      value: stats.totalPaidAppointments,
    },
    {
      name: "Pending",
      value: stats.totalPendingAppointments,
    },
    {
      name: "Cancelled",
      value: stats.totalCancelledAppointments,
    },
  ];

  const overviewData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Doctors",
      value: stats.totalDoctors,
    },
    {
      name: "Appointments",
      value: stats.totalAppointments,
    },
  ];

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">
            Users
          </div>

          <div className="stat-value">
            {stats.totalUsers}
          </div>
        </div>

        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">
            Doctors
          </div>

          <div className="stat-value">
            {stats.totalDoctors}
          </div>
        </div>

        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">
            Appointments
          </div>

          <div className="stat-value">
            {stats.totalAppointments}
          </div>
        </div>

        <div className="stat bg-success text-success-content rounded-xl">
          <div className="stat-title">
            Paid
          </div>

          <div className="stat-value">
            {stats.totalPaidAppointments}
          </div>
        </div>

        <div className="stat bg-warning text-warning-content rounded-xl">
          <div className="stat-title">
            Pending
          </div>

          <div className="stat-value">
            {stats.totalPendingAppointments}
          </div>
        </div>

        <div className="stat bg-error text-error-content rounded-xl">
          <div className="stat-title">
            Cancelled
          </div>

          <div className="stat-value">
            {stats.totalCancelledAppointments}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">
              System Overview
            </h2>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={overviewData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">
              Appointment Status
            </h2>

            <div className="h-80">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={appointmentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    <Cell />
                    <Cell />
                    <Cell />
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
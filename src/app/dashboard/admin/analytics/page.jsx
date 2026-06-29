"use client";

import { useEffect, useState } from "react";

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
    return <div className="text-center py-20">Loading analytics...</div>;
  }

  const appointmentData = [
    {
      name: "Pending",
      value: stats.pendingAppointments,
    },
    {
      name: "Completed",
      value: stats.completedAppointments,
    },
    {
      name: "Cancelled",
      value: stats.cancelledAppointments,
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
      name: "Patients",
      value: stats.totalPatients,
    },
    {
      name: "Reviews",
      value: stats.totalReviews,
    },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <p className="text-sm opacity-70 mt-2">
          Platform insights, revenue, users, and appointment statistics.
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Revenue</h3>

            <p className="text-4xl font-bold text-primary">
              ৳{stats.totalRevenue}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Appointments</h3>

            <p className="text-4xl font-bold">{stats.totalAppointments}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Reviews</h3>

            <p className="text-4xl font-bold">{stats.totalReviews}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Doctors</h3>

            <p className="text-4xl font-bold">{stats.totalDoctors}</p>
          </div>
        </div>
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-6">Platform Overview</h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overviewData}>
                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart */}

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-6">Appointment Status</h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {appointmentData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

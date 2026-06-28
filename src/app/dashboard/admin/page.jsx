"use client";

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/admin.service";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Total Users</h3>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Total Doctors</h3>
            <p className="text-4xl font-bold">{stats.totalDoctors}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Total Appointments</h3>
            <p className="text-4xl font-bold">{stats.totalAppointments}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Paid</h3>
            <p className="text-4xl font-bold">{stats.totalPaidAppointments}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Pending</h3>
            <p className="text-4xl font-bold">
              {stats.totalPendingAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3>Cancelled</h3>
            <p className="text-4xl font-bold">
              {stats.totalCancelledAppointments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

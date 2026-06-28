"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="text-lg">
              Users
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h2 className="text-lg">
              Doctors
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalDoctors}
            </p>
          </div>
        </div>

        <div className="card bg-accent text-accent-content">
          <div className="card-body">
            <h2 className="text-lg">
              Appointments
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-success text-success-content">
          <div className="card-body">
            <h2 className="text-lg">
              Paid Appointments
            </h2>

            <p className="text-4xl font-bold">
              {stats.totalPayments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
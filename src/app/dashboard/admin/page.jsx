"use client";

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/admin.service";

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
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Total Users
            </h2>
            <p className="text-4xl font-bold">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Total Patients
            </h2>
            <p className="text-4xl font-bold">
              {stats.totalPatients}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Total Doctors
            </h2>
            <p className="text-4xl font-bold">
              {stats.totalDoctors}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Appointments
            </h2>
            <p className="text-4xl font-bold">
              {stats.totalAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Completed
            </h2>
            <p className="text-4xl font-bold text-success">
              {stats.completedAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Pending
            </h2>
            <p className="text-4xl font-bold text-warning">
              {stats.pendingAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Cancelled
            </h2>
            <p className="text-4xl font-bold text-error">
              {stats.cancelledAppointments}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Total Revenue
            </h2>
            <p className="text-4xl font-bold text-primary">
              ৳ {stats.totalRevenue}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">
              Total Reviews
            </h2>
            <p className="text-4xl font-bold">
              {stats.totalReviews}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
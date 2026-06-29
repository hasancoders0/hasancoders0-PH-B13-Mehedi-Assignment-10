"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getMyAppointments } from "@/services/appointment.service";

export default function PatientDashboardPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user?.email) return;

        const data = await getMyAppointments(user.email);

        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const pending = appointments.filter((item) => item.status === "pending");

  const confirmed = appointments.filter((item) => item.status === "confirmed");

  const completed = appointments.filter((item) => item.status === "completed");

  const cancelled = appointments.filter((item) => item.status === "cancelled");

  const paidAppointments = appointments.filter(
    (item) => item.paymentStatus === "paid",
  );

  const totalSpent = paidAppointments.reduce(
    (sum, item) => sum + Number(item.paidAmount || item.consultationFee || 0),
    0,
  );

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>

          <p className="opacity-70 mt-2">
            Welcome back, {user?.displayName || "Patient"}.
          </p>
        </div>

        <Link
          href="/dashboard/patient/appointments"
          className="btn btn-primary mt-4 md:mt-0"
        >
          My Appointments
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total</h3>

            <p className="text-4xl font-bold">{appointments.length}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Pending</h3>

            <p className="text-4xl font-bold text-warning">{pending.length}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Confirmed</h3>

            <p className="text-4xl font-bold text-info">{confirmed.length}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Completed</h3>

            <p className="text-4xl font-bold text-success">
              {completed.length}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Spent</h3>

            <p className="text-4xl font-bold text-primary">৳{totalSpent}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 card bg-base-100 shadow border">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Quick Summary</h2>

          <div className="space-y-3">
            <p>
              Pending Appointments:
              <strong> {pending.length}</strong>
            </p>

            <p>
              Confirmed Appointments:
              <strong> {confirmed.length}</strong>
            </p>

            <p>
              Completed Consultations:
              <strong> {completed.length}</strong>
            </p>

            <p>
              Cancelled Appointments:
              <strong> {cancelled.length}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

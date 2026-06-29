"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getDoctorAppointments } from "@/services/appointment.service";

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

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

        <p className="text-sm opacity-70 mt-2">
          Overview of appointments and earnings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Total Appointments</h3>

            <p className="text-4xl font-bold">{appointments.length}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Pending</h3>

            <p className="text-4xl font-bold text-warning">
              {pendingAppointments.length}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Confirmed</h3>

            <p className="text-4xl font-bold text-info">
              {confirmedAppointments.length}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Completed</h3>

            <p className="text-4xl font-bold text-success">
              {completedAppointments.length}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="font-semibold">Revenue</h3>

            <p className="text-4xl font-bold">৳{totalRevenue}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 card bg-base-100 shadow border">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Quick Summary</h2>

          <div className="space-y-3">
            <p>
              Pending Requests:
              <strong> {pendingAppointments.length}</strong>
            </p>

            <p>
              Confirmed Appointments:
              <strong> {confirmedAppointments.length}</strong>
            </p>

            <p>
              Completed Consultations:
              <strong> {completedAppointments.length}</strong>
            </p>

            <p>
              Cancelled Appointments:
              <strong> {cancelledAppointments.length}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

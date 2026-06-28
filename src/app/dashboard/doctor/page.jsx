"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import {
  getDoctorAppointments,
} from "@/services/appointment.service";

export default function DoctorDashboardPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    if (!user?.email) return;

    getDoctorAppointments(user.email).then(
      setAppointments
    );
  }, [user]);

  const pending =
    appointments.filter(
      (a) => a.status === "pending"
    ).length;

  const confirmed =
    appointments.filter(
      (a) => a.status === "confirmed"
    ).length;

  const completed =
    appointments.filter(
      (a) => a.status === "completed"
    ).length;

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Doctor Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="card bg-base-100 shadow">

          <div className="card-body">

            <h3 className="text-lg">
              Pending
            </h3>

            <p className="text-4xl font-bold">
              {pending}
            </p>

          </div>

        </div>

        <div className="card bg-base-100 shadow">

          <div className="card-body">

            <h3 className="text-lg">
              Confirmed
            </h3>

            <p className="text-4xl font-bold">
              {confirmed}
            </p>

          </div>

        </div>

        <div className="card bg-base-100 shadow">

          <div className="card-body">

            <h3 className="text-lg">
              Completed
            </h3>

            <p className="text-4xl font-bold">
              {completed}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";

import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "@/services/appointment.service";

export default function DoctorRequestsPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] =
    useState([]);

  const loadAppointments = async () => {
    if (!user?.email) return;

    const data =
      await getDoctorAppointments(
        user.email
      );

    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleStatus = async (
    id,
    status
  ) => {
    await updateAppointmentStatus(
      id,
      status
    );

    loadAppointments();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Appointment Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.patientName}
                </td>

                <td>
                  {item.appointmentDate}
                </td>

                <td>
                  {item.appointmentTime}
                </td>

                <td>{item.status}</td>

                <td className="space-x-2">
                  <button
                    className="btn btn-success btn-xs"
                    onClick={() =>
                      handleStatus(
                        item._id,
                        "confirmed"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-error btn-xs"
                    onClick={() =>
                      handleStatus(
                        item._id,
                        "cancelled"
                      )
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-info btn-xs"
                    onClick={() =>
                      handleStatus(
                        item._id,
                        "completed"
                      )
                    }
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p className="text-center py-10">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
}
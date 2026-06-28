"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";

import {
  getMyAppointments,
  cancelAppointment,
} from "@/services/appointment.service";

export default function PatientDashboardPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    if (!user?.email) return;

    try {
      const data = await getMyAppointments(
        user.email
      );

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleCancel = async (id) => {
    const confirmCancel = confirm(
      "Cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      await cancelAppointment(id);

      await loadAppointments();

      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);

      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center py-10">
          No appointments found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item.doctorName}</td>

                  <td>
                    {item.appointmentDate}
                  </td>

                  <td>
                    {item.appointmentTime}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "cancelled"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.paymentStatus ===
                        "paid"
                          ? "badge-success"
                          : "badge-outline"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  <td>
                    {item.status ===
                    "pending" ? (
                      <button
                        onClick={() =>
                          handleCancel(item._id)
                        }
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-red-500">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
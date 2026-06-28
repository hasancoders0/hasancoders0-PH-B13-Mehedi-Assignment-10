"use client";

import Link from "next/link";
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
      const data = await getMyAppointments(user.email);

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleCancel = async (id) => {
    const ok = confirm("Cancel this appointment?");

    if (!ok) return;

    try {
      await cancelAppointment(id);

      await loadAppointments();

      alert("Appointment cancelled successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center py-10">No appointments found.</p>
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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item.doctorName}</td>

                  <td>{item.appointmentDate}</td>

                  <td>{item.appointmentTime}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "completed"
                          ? "badge-success"
                          : item.status === "confirmed"
                            ? "badge-info"
                            : item.status === "cancelled"
                              ? "badge-error"
                              : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.paymentStatus === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <Link
                        href={`/payment/${item._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Pay Now
                      </Link>
                    )}
                  </td>

                  <td className="space-x-2">
                    {/* Cancel */}
                    {item.status === "pending" && (
                      <button
                        onClick={() => handleCancel(item._id)}
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Review */}
                    {item.status === "completed" && !item.hasReview && (
                      <Link
                        href={`/dashboard/patient/review/${item._id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Write Review
                      </Link>
                    )}

                    {/* Reviewed */}
                    {item.hasReview && (
                      <span className="badge badge-success">Reviewed</span>
                    )}

                    {/* Cancelled */}
                    {item.status === "cancelled" && (
                      <span className="badge badge-error">Cancelled</span>
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

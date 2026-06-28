"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";
import {
  getMyAppointments,
  cancelAppointment,
} from "@/services/appointment.service";

export default function PatientAppointmentsPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
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

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      await cancelAppointment(id);
      loadAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel appointment");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="table table-zebra">

            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Review</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr key={appointment._id}>

                  <td>{appointment.doctorName}</td>

                  <td>{appointment.appointmentDate}</td>

                  <td>{appointment.appointmentTime}</td>

                  <td>

                    <span className="badge">

                      {appointment.status}

                    </span>

                  </td>

                  <td>

                    <span
                      className={`badge ${
                        appointment.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {appointment.paymentStatus}
                    </span>

                  </td>

                  <td>

                    {appointment.status === "completed" &&
                    appointment.paymentStatus === "paid" ? (

                      appointment.hasReview ? (

                        <span className="badge badge-success">
                          Reviewed
                        </span>

                      ) : (

                        <Link
                          href={`/dashboard/patient/reviews?appointment=${appointment._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Write Review
                        </Link>

                      )

                    ) : (

                      <span className="text-gray-400">
                        Not Available
                      </span>

                    )}

                  </td>

                  <td>

                    {appointment.status === "pending" && (

                      <button
                        onClick={() =>
                          handleCancel(appointment._id)
                        }
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>

                    )}

                    {appointment.paymentStatus === "unpaid" &&
                      appointment.status !== "cancelled" && (
                        <Link
                          href={`/payment/${appointment._id}`}
                          className="btn btn-sm btn-success ml-2"
                        >
                          Pay
                        </Link>
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
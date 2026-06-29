"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getMyAppointments } from "@/services/appointment.service";

export default function PatientPaymentsPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const data = await getMyAppointments(user.email);

        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Payment History
      </h1>

      {appointments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="table table-zebra">

            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr key={appointment._id}>

                  <td>{appointment.doctorName}</td>

                  <td>{appointment.appointmentDate}</td>

                  <td>
                    ${appointment.consultationFee}
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

                    {appointment.paymentStatus ===
                    "paid" ? (
                      <span className="text-success font-medium">
                        Payment Completed
                      </span>
                    ) : (
                      <Link
                        href={`/payment/${appointment._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Pay Now
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
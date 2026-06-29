"use client";

import { useEffect, useState } from "react";

import { getAllAppointments } from "@/services/appointment.service";

export default function AdminPaymentsPage() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const data = await getAllAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const paidAppointments = appointments.filter(
    (item) => item.paymentStatus === "paid",
  );

  const unpaidAppointments = appointments.filter(
    (item) => item.paymentStatus === "unpaid",
  );

  const totalRevenue = paidAppointments.reduce(
    (sum, item) => sum + Number(item.consultationFee || 0),
    0,
  );

  if (loading) {
    return <div className="text-center py-20">Loading payments...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment Management</h1>

        <p className="text-sm opacity-70 mt-2">
          Track all hospital payments and transactions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="text-lg font-medium">Total Revenue</h3>

            <p className="text-4xl font-bold">৳{totalRevenue}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="text-lg font-medium">Paid Appointments</h3>

            <p className="text-4xl font-bold">{paidAppointments.length}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h3 className="text-lg font-medium">Unpaid Appointments</h3>

            <p className="text-4xl font-bold">{unpaidAppointments.length}</p>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-20">No payment records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Paid Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientName}</td>

                  <td>{appointment.doctorName}</td>

                  <td>৳{appointment.consultationFee}</td>

                  <td>{appointment.transactionId || "N/A"}</td>

                  <td>
                    {appointment.paidAt
                      ? new Date(appointment.paidAt).toLocaleDateString()
                      : "-"}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

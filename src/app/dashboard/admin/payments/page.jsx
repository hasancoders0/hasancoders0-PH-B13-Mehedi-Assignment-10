"use client";

import { useEffect, useState } from "react";
import {
  FaMoneyCheckDollar,
  FaCircleCheck,
  FaClock,
  FaReceipt,
} from "react-icons/fa6";

import { getAllAppointments } from "@/services/appointment.service";

const statCards = [
  {
    key: "revenue",
    label: "Total Revenue",
    icon: FaMoneyCheckDollar,
    color: "primary",
  },
  {
    key: "paid",
    label: "Paid Appointments",
    icon: FaCircleCheck,
    color: "success",
  },
  {
    key: "unpaid",
    label: "Unpaid Appointments",
    icon: FaClock,
    color: "warning",
  },
];

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

  const getStatValue = (key) => {
    if (key === "revenue") return `৳${totalRevenue}`;
    if (key === "paid") return paidAppointments.length;
    if (key === "unpaid") return unpaidAppointments.length;
    return 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Payment Management
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Track all hospital payments and transactions.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="group relative bg-base-100 border border-base-300/60 rounded-3xl p-6 lg:p-7 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Hover accent line */}
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  {label}
                </p>
                <h3 className="text-3xl font-extrabold tracking-tight mt-2 bg-gradient-to-b from-base-content to-base-content/60 bg-clip-text text-transparent">
                  {getStatValue(key)}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`text-xl text-${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaReceipt className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No payment records found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            There are no transactions recorded yet.
          </p>
        </div>
      ) : (
        /* Table Card */
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-b border-base-300/50">
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Patient
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Doctor
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Amount
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Transaction ID
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Paid Date
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment._id}
                    className={`hover:bg-base-200/50 transition-colors duration-200 ${
                      index !== appointments.length - 1
                        ? "border-b border-base-300/30"
                        : ""
                    }`}
                  >
                    <td className="font-semibold text-sm">
                      {appointment.patientName}
                    </td>

                    <td className="text-sm opacity-80">
                      {appointment.doctorName}
                    </td>

                    <td>
                      <span className="text-sm font-semibold text-primary">
                        ৳{appointment.consultationFee}
                      </span>
                    </td>

                    <td className="text-sm opacity-60 font-mono">
                      {appointment.transactionId || "N/A"}
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {appointment.paidAt
                        ? new Date(appointment.paidAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`badge border-0 text-xs font-medium capitalize ${
                          appointment.paymentStatus === "paid"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
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
        </div>
      )}
    </div>
  );
}

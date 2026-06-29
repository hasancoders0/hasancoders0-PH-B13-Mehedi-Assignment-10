"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaMoneyCheckDollar,
  FaUserDoctor,
  FaCalendarDays,
  FaCircleCheck,
  FaCreditCard,
} from "react-icons/fa6";

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
          Payment History
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          View your transaction details and payment statuses.
        </p>
      </div>

      {appointments.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaMoneyCheckDollar className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No payment records found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            You haven&apos;t made any transactions yet.
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
                    Doctor
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Date
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Fee
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Status
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100 text-end">
                    Action
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
                    <td>
                      <div className="flex items-center gap-3">
                        <FaUserDoctor className="text-base-content/30 shrink-0" />
                        <span className="font-semibold text-sm">
                          {appointment.doctorName}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2 text-sm opacity-60 font-light">
                        <FaCalendarDays className="text-xs opacity-60 shrink-0" />
                        {appointment.appointmentDate}
                      </div>
                    </td>

                    <td>
                      <span className="text-sm font-semibold text-primary">
                        ৳{appointment.consultationFee}
                      </span>
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

                    <td>
                      <div className="flex justify-end">
                        {appointment.paymentStatus === "paid" ? (
                          <div className="inline-flex items-center gap-2 text-xs text-success font-medium">
                            <FaCircleCheck className="text-sm" />
                            Completed
                          </div>
                        ) : (
                          <Link
                            href={`/payment/${appointment._id}`}
                            className="btn btn-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 gap-2"
                          >
                            <FaCreditCard className="text-xs" />
                            Pay Now
                          </Link>
                        )}
                      </div>
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

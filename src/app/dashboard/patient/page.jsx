"use client";

import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getMyAppointments } from "@/services/appointment.service";

export default function PatientDashboardPage() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      getMyAppointments(user.email).then(setAppointments);
    }
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Appointments
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item._id}>
                <td>{item.doctorName}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>{item.status}</td>
                <td>{item.paymentStatus}</td>
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
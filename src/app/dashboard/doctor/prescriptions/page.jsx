"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";

import { getDoctorPrescriptions } from "@/services/prescription.service";

export default function DoctorPrescriptionsPage() {
  const { user } = useAuth();

  const [prescriptions, setPrescriptions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrescriptions = async () => {
      if (!user?.email) return;

      try {
        const data = await getDoctorPrescriptions(user.email);

        setPrescriptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, [user]);

  if (loading) {
    return <div className="text-center py-20">Loading prescriptions...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Prescriptions</h1>

        <Link href="/dashboard/doctor/requests" className="btn btn-primary">
          Create From Appointment
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Diagnosis</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((item) => (
                <tr key={item._id}>
                  <td>{item.patientName}</td>

                  <td>{item.diagnosis}</td>

                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                  <td>
                    <Link
                      href={`/dashboard/doctor/prescriptions/${item._id}`}
                      className="btn btn-info btn-xs"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

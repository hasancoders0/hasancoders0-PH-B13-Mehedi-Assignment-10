"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { getPatientPrescriptions } from "@/services/prescription.service";

export default function PatientPrescriptionsPage() {
  const { user } = useAuth();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrescriptions = async () => {
      if (!user?.email) return;

      try {
        const data = await getPatientPrescriptions(user.email);

        setPrescriptions(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    loadPrescriptions();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">

        My Prescriptions

      </h1>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>Doctor</th>

              <th>Diagnosis</th>

              <th>Date</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {prescriptions.length > 0 ? (
              prescriptions.map((item) => (
                <tr key={item._id}>

                  <td>{item.doctorName}</td>

                  <td>{item.diagnosis}</td>

                  <td>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <Link
                      href={`/dashboard/patient/prescriptions/${item._id}`}
                      className="btn btn-primary btn-xs"
                    >
                      View
                    </Link>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={4}
                  className="text-center py-10"
                >
                  No Prescription Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
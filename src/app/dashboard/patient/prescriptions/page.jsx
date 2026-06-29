"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFileMedical,
  FaStethoscope,
  FaCalendarDays,
  FaEye,
} from "react-icons/fa6";

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
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
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
          My Prescriptions
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          View and download your digital prescriptions.
        </p>
      </div>

      {prescriptions.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaFileMedical className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No prescriptions found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            Your prescriptions will appear here after consultations.
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
                    Diagnosis
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Date
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100 text-end">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {prescriptions.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-base-200/50 transition-colors duration-200 ${
                      index !== prescriptions.length - 1
                        ? "border-b border-base-300/30"
                        : ""
                    }`}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <FaStethoscope className="text-base-content/30 shrink-0" />
                        <span className="font-semibold text-sm">
                          {item.doctorName}
                        </span>
                      </div>
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {item.diagnosis}
                    </td>

                    <td>
                      <div className="flex items-center gap-2 text-sm opacity-60 font-light">
                        <FaCalendarDays className="text-xs opacity-60 shrink-0" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-end">
                        <Link
                          href={`/dashboard/patient/prescriptions/${item._id}`}
                          className="btn btn-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 gap-2 rounded-xl"
                        >
                          <FaEye className="text-xs" />
                          View
                        </Link>
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
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaHospitalUser,
  FaStethoscope,
  FaUser,
  FaEnvelope,
  FaCalendarDays,
  FaNotesMedical,
  FaPills,
  FaPen,
  FaArrowLeft,
  FaFileMedical,
  FaCircleExclamation,
} from "react-icons/fa6";

import { getPrescriptionById } from "@/services/prescription.service";

export default function PrescriptionDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPrescription = async () => {
    try {
      const data = await getPrescriptionById(id);
      setPrescription(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadPrescription();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaCircleExclamation className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          Prescription not found
        </h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The prescription you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Prescription Details
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            View patient diagnosis, medicines, and advice.
          </p>
        </div>

        <button
          onClick={() =>
            router.push(`/dashboard/doctor/prescriptions/edit/${id}`)
          }
          className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200 self-start"
        >
          <FaPen className="text-xs" />
          Edit Prescription
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10 space-y-8">
        {/* Patient & Doctor Information */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Patient Info */}
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                <FaHospitalUser className="text-sm text-success" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                Patient Information
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaUser className="text-xs text-base-content/30 mt-1 shrink-0" />
                <div>
                  <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                    Name
                  </p>
                  <p className="font-semibold mt-0.5">
                    {prescription.patientName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-xs text-base-content/30 mt-1 shrink-0" />
                <div>
                  <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-light opacity-70 mt-0.5">
                    {prescription.patientEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaStethoscope className="text-sm text-primary" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                Doctor Information
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaUser className="text-xs text-base-content/30 mt-1 shrink-0" />
                <div>
                  <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                    Name
                  </p>
                  <p className="font-semibold mt-0.5">
                    {prescription.doctorName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-xs text-base-content/30 mt-1 shrink-0" />
                <div>
                  <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                    Email
                  </p>
                  <p className="font-light opacity-70 mt-0.5">
                    {prescription.doctorEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaNotesMedical className="text-lg text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Diagnosis</h3>
          </div>
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5 text-sm opacity-70 font-light leading-relaxed">
            {prescription.diagnosis}
          </div>
        </div>

        {/* Medicines */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaPills className="text-lg text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Medicines</h3>
          </div>
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5 text-sm opacity-70 font-light leading-relaxed whitespace-pre-wrap">
            {prescription.medications}
          </div>
        </div>

        {/* Advice */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaStethoscope className="text-lg text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Advice</h3>
          </div>
          <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5 text-sm opacity-70 font-light leading-relaxed whitespace-pre-wrap">
            {prescription.advice || "No additional advice provided."}
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-base-300/50">
          <div className="flex items-center gap-2 text-xs opacity-40 font-light">
            <FaCalendarDays className="text-xs opacity-60" />
            <span>
              Created: {new Date(prescription.createdAt).toLocaleString()}
            </span>
          </div>

          {prescription.updatedAt && (
            <div className="flex items-center gap-2 text-xs opacity-40 font-light">
              <FaCalendarDays className="text-xs opacity-60" />
              <span>
                Updated: {new Date(prescription.updatedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() =>
              router.push(`/dashboard/doctor/prescriptions/edit/${id}`)
            }
            className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200"
          >
            <FaPen className="text-xs" />
            Edit Prescription
          </button>

          <button
            onClick={() => router.back()}
            className="btn btn-ghost gap-2 rounded-xl hover:bg-base-200 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

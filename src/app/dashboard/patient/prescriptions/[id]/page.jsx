"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaFileMedical,
  FaPrint,
  FaStethoscope,
  FaHospitalUser,
  FaCalendarDays,
  FaEnvelope,
  FaUser,
  FaPills,
  FaNotesMedical,
} from "react-icons/fa6";

import { getPrescriptionById } from "@/services/prescription.service";

export default function PatientPrescriptionDetailsPage() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
          <FaFileMedical className="text-3xl text-base-content/30" />
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
      {/* Main Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-8 lg:p-10 border-b border-base-300/50">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaFileMedical className="text-2xl text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Medical Prescription
                </h1>
              </div>

              <div className="flex items-center gap-2 text-sm opacity-50 font-light pl-16">
                <FaCalendarDays className="text-xs opacity-60" />
                <span>
                  Issued on:{" "}
                  {new Date(prescription.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              className="btn btn-sm bg-base-200 border-0 hover:bg-base-300 gap-2 rounded-xl self-start transition-colors duration-200"
              onClick={() => window.print()}
            >
              <FaPrint className="text-xs" />
              Print
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 lg:p-10 space-y-8">
          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Doctor Info */}
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaStethoscope className="text-sm text-primary" />
                </div>
                <h3 className="font-bold tracking-tight">Doctor Information</h3>
              </div>

              <div className="space-y-4 text-sm">
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

            {/* Patient Info */}
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                  <FaHospitalUser className="text-sm text-success" />
                </div>
                <h3 className="font-bold tracking-tight">
                  Patient Information
                </h3>
              </div>

              <div className="space-y-4 text-sm">
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
          </div>

          {/* Diagnosis */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaNotesMedical className="text-lg text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Diagnosis</h2>
            </div>
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6 text-sm opacity-70 font-light leading-relaxed">
              {prescription.diagnosis}
            </div>
          </div>

          {/* Medications */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaPills className="text-lg text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Medications</h2>
            </div>
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6 text-sm opacity-70 font-light leading-relaxed whitespace-pre-line">
              {prescription.medications}
            </div>
          </div>

          {/* Notes & Advice */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaNotesMedical className="text-lg text-primary" />
              <h2 className="text-xl font-bold tracking-tight">
                Notes & Advice
              </h2>
            </div>
            <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6 text-sm opacity-70 font-light leading-relaxed whitespace-pre-line">
              {prescription.notes || "No additional advice provided."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

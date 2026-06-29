"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaNotesMedical,
  FaPills,
  FaStethoscope,
  FaUser,
  FaHospitalUser,
  FaFloppyDisk,
  FaCircleExclamation,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";

import { getAppointmentById } from "@/services/appointment.service";
import { createPrescription } from "@/services/prescription.service";

export default function CreatePrescriptionPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const data = await getAppointmentById(params.appointmentId);
        setAppointment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.appointmentId) {
      loadAppointment();
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    try {
      await createPrescription({
        appointmentId: appointment._id,
        doctorId: appointment.doctorId,
        doctorName: appointment.doctorName,
        doctorEmail: user.email,
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        diagnosis: form.diagnosis.value,
        medications: form.medications.value,
        notes: form.notes.value,
      });

      router.push("/dashboard/doctor/prescriptions");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to create prescription.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaCircleExclamation className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          Appointment not found
        </h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The appointment you are trying to prescribe for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create Prescription
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Fill in the medical details for the patient.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10 space-y-8">
        {/* Info Grid */}
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

            <div className="flex items-center gap-3 text-sm">
              <FaUser className="text-xs text-base-content/30 shrink-0" />
              <div>
                <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                  Name
                </p>
                <p className="font-semibold mt-0.5">
                  {appointment.patientName}
                </p>
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

            <div className="flex items-center gap-3 text-sm">
              <FaUser className="text-xs text-base-content/30 shrink-0" />
              <div>
                <p className="text-xs opacity-40 font-medium uppercase tracking-wider">
                  Name
                </p>
                <p className="font-semibold mt-0.5">{appointment.doctorName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Diagnosis */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Diagnosis
              </span>
            </label>
            <div className="relative">
              <FaNotesMedical className="absolute left-3.5 top-4 text-base-content/30" />
              <textarea
                name="diagnosis"
                required
                rows={4}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="Enter diagnosis details..."
              />
            </div>
          </div>

          {/* Medications */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Medications
              </span>
            </label>
            <div className="relative">
              <FaPills className="absolute left-3.5 top-4 text-base-content/30" />
              <textarea
                name="medications"
                required
                rows={5}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder={
                  "Example:\n1. Napa Extra 500mg - Twice daily\n2. Omeprazole 20mg - Before breakfast"
                }
              />
            </div>
          </div>

          {/* Notes & Advice */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Notes & Advice
              </span>
            </label>
            <div className="relative">
              <FaStethoscope className="absolute left-3.5 top-4 text-base-content/30" />
              <textarea
                name="notes"
                rows={4}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="Additional advice for the patient..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaFloppyDisk className="text-sm" />
              )}
              {submitting ? "Saving..." : "Save Prescription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

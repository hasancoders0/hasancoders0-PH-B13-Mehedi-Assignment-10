"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FaNotesMedical,
  FaPills,
  FaStethoscope,
  FaUser,
  FaHospitalUser,
  FaFloppyDisk,
  FaArrowLeft,
  FaCircleExclamation,
} from "react-icons/fa6";

import {
  getPrescriptionById,
  updatePrescription,
} from "@/services/prescription.service";

export default function EditPrescriptionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;

    try {
      await updatePrescription(id, {
        diagnosis: form.diagnosis.value,
        medicines: form.medicines.value,
        advice: form.advice.value,
      });

      toast.success("Prescription updated successfully.");
      router.push(`/dashboard/doctor/prescriptions/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update prescription.");
    } finally {
      setSaving(false);
    }
  };

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
          The prescription you are trying to edit does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Edit Prescription
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Update diagnosis, medicines, and patient advice.
        </p>
      </div>

      {/* Main Card */}
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
                  {prescription.patientName}
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
                <p className="font-semibold mt-0.5">
                  {prescription.doctorName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
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
                rows={4}
                required
                defaultValue={prescription.diagnosis}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="Enter diagnosis details..."
              />
            </div>
          </div>

          {/* Medicines */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Medicines
              </span>
            </label>
            <div className="relative">
              <FaPills className="absolute left-3.5 top-4 text-base-content/30" />
              <textarea
                name="medicines"
                rows={6}
                required
                defaultValue={prescription.medications}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="List prescribed medicines..."
              />
            </div>
          </div>

          {/* Advice */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Advice
              </span>
            </label>
            <div className="relative">
              <FaStethoscope className="absolute left-3.5 top-4 text-base-content/30" />
              <textarea
                name="advice"
                rows={4}
                defaultValue={prescription.advice}
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                placeholder="Enter additional advice for the patient..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary flex-1 sm:flex-none rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
            >
              {saving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaFloppyDisk className="text-sm" />
              )}
              {saving ? "Updating..." : "Update Prescription"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-ghost flex-1 sm:flex-none rounded-xl hover:bg-base-200 transition-colors duration-200 gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

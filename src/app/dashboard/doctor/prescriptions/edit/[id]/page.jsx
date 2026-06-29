"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
    return <div className="text-center py-20">Loading prescription...</div>;
  }

  if (!prescription) {
    return <div className="text-center py-20">Prescription not found.</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Prescription</h1>

        <p className="text-sm opacity-70 mt-2">
          Update diagnosis, medicines, and patient advice.
        </p>
      </div>

      <div className="card bg-base-100 shadow border">
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Patient Name</span>
              </label>

              <input
                readOnly
                value={prescription.patientName}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Doctor Name</span>
              </label>

              <input
                readOnly
                value={prescription.doctorName}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Diagnosis</span>
              </label>

              <textarea
                name="diagnosis"
                rows={4}
                required
                defaultValue={prescription.diagnosis}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Medicines</span>
              </label>

              <textarea
                name="medicines"
                rows={6}
                required
                defaultValue={prescription.medicines}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Advice</span>
              </label>

              <textarea
                name="advice"
                rows={4}
                defaultValue={prescription.advice}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
              >
                {saving ? "Updating..." : "Update Prescription"}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import useAuth from "@/hooks/useAuth";
import { createPrescription } from "@/services/prescription.service";

export default function NewPrescriptionPage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const prescriptionData = {
      doctorName: user.displayName || "Doctor",
      doctorEmail: user.email,

      patientName: form.patientName.value,
      patientEmail: form.patientEmail.value,

      diagnosis: form.diagnosis.value,
      medicines: form.medicines.value,
      advice: form.advice.value,
    };

    try {
      await createPrescription(prescriptionData);

      alert("Prescription created successfully!");

      form.reset();
    } catch (error) {
      console.error(error);

      alert("Failed to create prescription.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Write Prescription
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="patientName"
          placeholder="Patient Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          name="patientEmail"
          placeholder="Patient Email"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          className="textarea textarea-bordered w-full"
          rows={3}
          required
        />

        <textarea
          name="medicines"
          placeholder="Medicines"
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        />

        <textarea
          name="advice"
          placeholder="Doctor Advice"
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        />

        <button
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Prescription"}
        </button>
      </form>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

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

    const diagnosis = form.diagnosis.value;

    const medications = form.medications.value;

    const notes = form.notes.value;

    try {
      await createPrescription({
        appointmentId: appointment._id,

        doctorId: appointment.doctorId,

        doctorName: appointment.doctorName,

        doctorEmail: user.email,

        patientName: appointment.patientName,

        patientEmail: appointment.patientEmail,

        diagnosis,
        medications,
        notes,
      });

      router.push("/dashboard/doctor/prescriptions");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create prescription.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading appointment...</div>;
  }

  if (!appointment) {
    return <div className="text-center py-20">Appointment not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Prescription</h1>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="font-semibold">Patient Name</label>

              <input
                type="text"
                value={appointment.patientName}
                readOnly
                className="input input-bordered w-full mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Doctor Name</label>

              <input
                type="text"
                value={appointment.doctorName}
                readOnly
                className="input input-bordered w-full mt-2"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-semibold">Diagnosis</label>

              <textarea
                name="diagnosis"
                required
                rows={4}
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Enter diagnosis..."
              />
            </div>

            <div>
              <label className="font-semibold">Medications</label>

              <textarea
                name="medications"
                required
                rows={5}
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Example:

1. Napa Extra 500mg - Twice daily
2. Omeprazole 20mg - Before breakfast"
              />
            </div>

            <div>
              <label className="font-semibold">Notes & Advice</label>

              <textarea
                name="notes"
                rows={4}
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Additional advice for the patient..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? "Saving..." : "Save Prescription"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

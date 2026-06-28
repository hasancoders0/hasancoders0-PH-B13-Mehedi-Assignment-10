"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import { getAppointmentById } from "@/services/appointment.service";
import { createPrescription } from "@/services/prescription.service";

export default function PrescriptionPage() {
  const { appointmentId } = useParams();

  const router = useRouter();

  const { user } = useAuth();

  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const data =
          await getAppointmentById(appointmentId);

        setAppointment(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    if (appointmentId) {
      loadAppointment();
    }
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const prescriptionData = {
      appointmentId,

      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      doctorEmail: appointment.doctorEmail,

      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,

      diagnosis: form.diagnosis.value,
      medicines: form.medicines.value,
      advice: form.advice.value,
    };

    try {
      await createPrescription(
        prescriptionData
      );

      alert("Prescription saved.");

      router.push(
        "/dashboard/doctor/requests"
      );
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-20">
        Appointment not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold">

            Write Prescription

          </h2>

          <div className="divider"></div>

          <div className="space-y-2 mb-6">

            <p>

              <strong>Patient :</strong>{" "}

              {appointment.patientName}

            </p>

            <p>

              <strong>Email :</strong>{" "}

              {appointment.patientEmail}

            </p>

            <p>

              <strong>Doctor :</strong>{" "}

              {appointment.doctorName}

            </p>

            <p>

              <strong>Date :</strong>{" "}

              {appointment.appointmentDate}

            </p>

            <p>

              <strong>Time :</strong>{" "}

              {appointment.appointmentTime}

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <textarea
              name="diagnosis"
              required
              rows={3}
              className="textarea textarea-bordered w-full"
              placeholder="Diagnosis"
            />

            <textarea
              name="medicines"
              required
              rows={5}
              className="textarea textarea-bordered w-full"
              placeholder="Medicines"
            />

            <textarea
              name="advice"
              required
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Advice"
            />

            <button className="btn btn-primary">

              Save Prescription

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    return <div className="text-center py-20">Loading prescription...</div>;
  }

  if (!prescription) {
    return <div className="text-center py-20">Prescription not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg border">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Medical Prescription</h1>

              <p className="text-sm opacity-70 mt-2">
                {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button className="btn btn-outline" onClick={() => window.print()}>
              Print
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Doctor Information</h3>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {prescription.doctorName}
                </p>

                <p>
                  <strong>Email:</strong> {prescription.doctorEmail}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Patient Information</h3>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {prescription.patientName}
                </p>

                <p>
                  <strong>Email:</strong> {prescription.patientEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-3">Diagnosis</h2>

              <div className="bg-base-200 p-4 rounded-lg">
                {prescription.diagnosis}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Medications</h2>

              <div className="bg-base-200 p-4 rounded-lg whitespace-pre-line">
                {prescription.medications}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Notes & Advice</h2>

              <div className="bg-base-200 p-4 rounded-lg whitespace-pre-line">
                {prescription.notes || "No additional advice."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

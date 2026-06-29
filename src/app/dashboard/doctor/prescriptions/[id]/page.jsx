"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    return <div className="text-center py-20">Loading prescription...</div>;
  }

  if (!prescription) {
    return <div className="text-center py-20">Prescription not found.</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Prescription Details</h1>

          <p className="text-sm opacity-70 mt-2">
            View patient diagnosis, medicines, and advice.
          </p>
        </div>

        <button
          className="btn btn-warning"
          onClick={() =>
            router.push(`/dashboard/doctor/prescriptions/edit/${id}`)
          }
        >
          Edit Prescription
        </button>
      </div>

      <div className="card bg-base-100 shadow border">
        <div className="card-body space-y-8">
          {/* Patient & Doctor Information */}

          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          <div className="divider"></div>

          {/* Diagnosis */}

          <div>
            <h3 className="text-xl font-bold mb-3">Diagnosis</h3>

            <div className="border rounded-lg p-4">
              {prescription.diagnosis}
            </div>
          </div>

          {/* Medicines */}

          <div>
            <h3 className="text-xl font-bold mb-3">Medicines</h3>

            <div className="border rounded-lg p-4 whitespace-pre-wrap">
              {prescription.medicines}
            </div>
          </div>

          {/* Advice */}

          <div>
            <h3 className="text-xl font-bold mb-3">Advice</h3>

            <div className="border rounded-lg p-4 whitespace-pre-wrap">
              {prescription.advice || "No additional advice."}
            </div>
          </div>

          <div className="divider"></div>

          {/* Dates */}

          <div className="flex flex-wrap gap-6 text-sm opacity-70">
            <span>
              Created: {new Date(prescription.createdAt).toLocaleString()}
            </span>

            {prescription.updatedAt && (
              <span>
                Updated: {new Date(prescription.updatedAt).toLocaleString()}
              </span>
            )}
          </div>

          {/* Actions */}

          <div className="flex gap-3">
            <button
              className="btn btn-warning"
              onClick={() =>
                router.push(`/dashboard/doctor/prescriptions/edit/${id}`)
              }
            >
              Edit Prescription
            </button>

            <button className="btn btn-outline" onClick={() => router.back()}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

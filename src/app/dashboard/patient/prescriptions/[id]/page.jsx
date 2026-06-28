"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPrescriptionById } from "@/services/prescription.service";

export default function PrescriptionDetailsPage() {
  const { id } = useParams();

  const [prescription, setPrescription] =
    useState(null);

  useEffect(() => {
    if (id) {
      getPrescriptionById(id).then(
        setPrescription
      );
    }
  }, [id]);

  if (!prescription) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold">

            Prescription

          </h2>

          <div className="divider"></div>

          <p>

            <strong>Doctor :</strong>{" "}

            {prescription.doctorName}

          </p>

          <p>

            <strong>Patient :</strong>{" "}

            {prescription.patientName}

          </p>

          <p>

            <strong>Diagnosis :</strong>

          </p>

          <p>{prescription.diagnosis}</p>

          <p>

            <strong>Medicines :</strong>

          </p>

          <p>{prescription.medicines}</p>

          <p>

            <strong>Advice :</strong>

          </p>

          <p>{prescription.advice}</p>

        </div>

      </div>

    </div>
  );
}
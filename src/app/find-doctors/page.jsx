"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDoctors } from "@/services/doctor.service";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Find Doctors</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="text-xl font-bold">{doctor.name}</h2>

              <p>{doctor.specialty}</p>

              <p>{doctor.hospital}</p>

              <Link
                href={`/doctors/${doctor._id}`}
                className="btn btn-primary mt-4"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

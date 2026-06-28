"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAllDoctors, deleteDoctor } from "@/services/admin-doctor.service";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const data = await getAllDoctors();
    setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    const ok = confirm("Delete this doctor?");

    if (!ok) return;

    await deleteDoctor(id);

    loadDoctors();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Doctors</h1>

        <Link href="/dashboard/admin/doctors/add" className="btn btn-primary">
          Add Doctor
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Hospital</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>

                <td>{doctor.specialty}</td>

                <td>{doctor.hospital}</td>

                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {doctors.length === 0 && (
            <div className="text-center py-10">No doctors found.</div>
          )}
        </table>
      </div>
    </div>
  );
}

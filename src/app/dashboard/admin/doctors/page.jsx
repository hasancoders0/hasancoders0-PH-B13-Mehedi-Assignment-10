"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getAllDoctors,
  verifyDoctor,
  unverifyDoctor,
  deleteDoctor,
} from "@/services/admin-doctor.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadDoctors = async () => {
    try {
      setLoading(true);

      const data = await getAllDoctors();

      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleVerify = (id) => {
    setConfirmModal({
      open: true,
      title: "Verify Doctor",
      message: "Are you sure you want to verify this doctor?",
      confirmText: "Verify",
      confirmClass: "btn-success",

      onConfirm: async () => {
        try {
          await verifyDoctor(id);

          closeModal();

          loadDoctors();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleUnverify = (id) => {
    setConfirmModal({
      open: true,
      title: "Revoke Verification",
      message: "Move this doctor back to pending verification?",
      confirmText: "Revoke",
      confirmClass: "btn-warning",

      onConfirm: async () => {
        try {
          await unverifyDoctor(id);

          closeModal();

          loadDoctors();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleDelete = (id) => {
    setConfirmModal({
      open: true,
      title: "Delete Doctor",
      message: "This action cannot be undone. Delete this doctor permanently?",
      confirmText: "Delete",
      confirmClass: "btn-error",

      onConfirm: async () => {
        try {
          await deleteDoctor(id);

          closeModal();

          loadDoctors();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading doctors...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Doctors</h1>

          <p className="text-sm opacity-70 mt-2">
            Total Doctors: {doctors.length}
          </p>
        </div>

        <Link href="/dashboard/admin/doctors/add" className="btn btn-primary">
          Add Doctor
        </Link>
      </div>

      {doctors.length === 0 ? (
        <div className="text-center py-20">No doctors found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>

                  <td>{doctor.email}</td>

                  <td>{doctor.specialization}</td>

                  <td>৳{doctor.consultationFee}</td>

                  <td>
                    <span
                      className={`badge ${
                        doctor.verificationStatus === "verified"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {doctor.verificationStatus || "pending"}
                    </span>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      {doctor.verificationStatus === "verified" ? (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleUnverify(doctor._id)}
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleVerify(doctor._id)}
                        >
                          Verify
                        </button>
                      )}

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(doctor._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
        onConfirm={confirmModal.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}

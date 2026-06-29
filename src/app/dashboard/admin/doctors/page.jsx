"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaPlus,
  FaCheckCircle,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";

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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Manage Doctors
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Total Doctors:{" "}
            <span className="font-semibold text-base-content/70">
              {doctors.length}
            </span>
          </p>
        </div>

        <Link
          href="/dashboard/admin/doctors/add"
          className="btn btn-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 gap-2 self-start"
        >
          <FaPlus className="text-sm" />
          Add Doctor
        </Link>
      </div>

      {doctors.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaUserMd className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No doctors found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            There are no doctors registered yet.
          </p>
        </div>
      ) : (
        /* Table Card */
        <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-b border-base-300/50">
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Name
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Email
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Specialization
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Fee
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Status
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100 text-end">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor, index) => (
                  <tr
                    key={doctor._id}
                    className={`hover:bg-base-200/50 transition-colors duration-200 ${
                      index !== doctors.length - 1
                        ? "border-b border-base-300/30"
                        : ""
                    }`}
                  >
                    <td>
                      <div className="font-semibold text-sm">{doctor.name}</div>
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {doctor.email}
                    </td>

                    <td className="text-sm opacity-80">
                      {doctor.specialization}
                    </td>

                    <td>
                      <span className="text-sm font-semibold text-primary">
                        ৳{doctor.consultationFee}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge border-0 text-xs font-medium ${
                          doctor.verificationStatus === "verified"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {doctor.verificationStatus || "pending"}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center justify-end gap-2">
                        {doctor.verificationStatus === "verified" ? (
                          <button
                            className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 btn-square"
                            onClick={() => handleUnverify(doctor._id)}
                            title="Revoke Verification"
                          >
                            <FaShieldAlt className="text-xs" />
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm bg-success/10 text-success border-0 hover:bg-success/20 btn-square"
                            onClick={() => handleVerify(doctor._id)}
                            title="Verify Doctor"
                          >
                             <FaCheckCircle className="text-xs" />
                          </button>
                        )}

                        <button
                          className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 btn-square"
                          onClick={() => handleDelete(doctor._id)}
                          title="Delete Doctor"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

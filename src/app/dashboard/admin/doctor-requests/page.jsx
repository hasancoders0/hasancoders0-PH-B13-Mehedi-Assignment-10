"use client";

import { useEffect, useState } from "react";
import {
  FaUserDoctor,
  FaCircleCheck,
  FaCircleXmark,
  FaClipboardList,
} from "react-icons/fa6";

import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getAllDoctorRequests,
  approveDoctorRequest,
  rejectDoctorRequest,
} from "@/services/doctorRequest.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function DoctorRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadRequests = async () => {
    try {
      const data = await getAllDoctorRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = (id) => {
    setConfirmModal({
      open: true,
      title: "Approve Doctor",
      message: "Approve this doctor application?",
      confirmText: "Approve",
      confirmClass: "btn-success",
      onConfirm: async () => {
        try {
          await approveDoctorRequest(id);
          closeModal();
          loadRequests();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleReject = (id) => {
    setConfirmModal({
      open: true,
      title: "Reject Doctor",
      message: "Reject this doctor application?",
      confirmText: "Reject",
      confirmClass: "btn-error",
      onConfirm: async () => {
        try {
          await rejectDoctorRequest(id);
          closeModal();
          loadRequests();
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Doctor Requests
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Review and manage doctor applications.
        </p>
      </div>

      {requests.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaClipboardList className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No requests found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            There are no pending doctor applications at the moment.
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
                    Specialization
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Hospital
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
                {requests.map((request, index) => (
                  <tr
                    key={request._id}
                    className={`hover:bg-base-200/50 transition-colors duration-200 ${
                      index !== requests.length - 1
                        ? "border-b border-base-300/30"
                        : ""
                    }`}
                  >
                    <td>
                      <div className="font-semibold text-sm">
                        {request.name}
                      </div>
                    </td>

                    <td className="text-sm opacity-80">
                      {request.specialization}
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {request.hospital}
                    </td>

                    <td>
                      <span
                        className={`badge border-0 text-xs font-medium capitalize ${
                          request.status === "approved"
                            ? "bg-success/10 text-success"
                            : request.status === "rejected"
                              ? "bg-error/10 text-error"
                              : "bg-warning/10 text-warning"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td>
                      {request.status === "pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="btn btn-sm bg-success/10 text-success border-0 hover:bg-success/20 btn-square"
                            onClick={() => handleApprove(request._id)}
                            title="Approve Request"
                          >
                            <FaCircleCheck className="text-xs" />
                          </button>

                          <button
                            className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 btn-square"
                            onClick={() => handleReject(request._id)}
                            title="Reject Request"
                          >
                            <FaCircleXmark className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <span className="block text-end text-xs opacity-30 font-light">
                          Processed
                        </span>
                      )}
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

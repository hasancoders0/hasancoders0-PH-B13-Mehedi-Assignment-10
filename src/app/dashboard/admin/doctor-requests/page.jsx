"use client";

import { useEffect, useState } from "react";

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
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Doctor Requests</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Hospital</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.name}</td>

                <td>{request.specialization}</td>

                <td>{request.hospital}</td>

                <td>
                  <span
                    className={`badge ${
                      request.status === "approved"
                        ? "badge-success"
                        : request.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                <td>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleApprove(request._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleReject(request._id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

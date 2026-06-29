"use client";

import { useEffect, useState } from "react";

import ConfirmModal from "@/components/shared/ConfirmModal";

import {
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "@/services/appointment.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState(initialModalState);

  const closeModal = () => {
    setConfirmModal(initialModalState);
  };

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const data = await getAllAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = (id, status) => {
    setConfirmModal({
      open: true,
      title: `Mark as ${status}`,
      message: `Are you sure you want to change this appointment to ${status}?`,
      confirmText: "Confirm",
      confirmClass: "btn-primary",

      onConfirm: async () => {
        try {
          await updateAppointmentStatus(id, status);

          closeModal();

          loadAppointments();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleCancel = (id) => {
    setConfirmModal({
      open: true,
      title: "Cancel Appointment",
      message: "Are you sure you want to cancel this appointment?",
      confirmText: "Cancel Appointment",
      confirmClass: "btn-error",

      onConfirm: async () => {
        try {
          await cancelAppointment(id);

          closeModal();

          loadAppointments();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading appointments...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>

        <span className="badge badge-lg">Total: {appointments.length}</span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-20">No appointments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Fee</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientName}</td>

                  <td>{appointment.doctorName}</td>

                  <td>{appointment.appointmentDate}</td>

                  <td>{appointment.appointmentTime}</td>

                  <td>৳{appointment.consultationFee}</td>

                  <td>
                    <span
                      className={`badge ${
                        appointment.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {appointment.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        appointment.status === "completed"
                          ? "badge-success"
                          : appointment.status === "confirmed"
                            ? "badge-info"
                            : appointment.status === "cancelled"
                              ? "badge-error"
                              : "badge-warning"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      {appointment.status === "pending" && (
                        <>
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() =>
                              handleStatusChange(appointment._id, "confirmed")
                            }
                          >
                            Confirm
                          </button>

                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => handleCancel(appointment._id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {appointment.status === "confirmed" && (
                        <>
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() =>
                              handleStatusChange(appointment._id, "completed")
                            }
                          >
                            Complete
                          </button>

                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => handleCancel(appointment._id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {(appointment.status === "completed" ||
                        appointment.status === "cancelled") && (
                        <span className="text-sm opacity-70">No actions</span>
                      )}
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

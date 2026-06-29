"use client";

import { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaCircleCheck,
  FaCircleXmark,
  FaFlagCheckered,
} from "react-icons/fa6";

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
            Manage Appointments
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Monitor and update patient appointment statuses.
          </p>
        </div>

        <div className="bg-base-100 border border-base-300/60 rounded-2xl px-5 py-3 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">
            Total Bookings
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-primary">
            {appointments.length}
          </p>
        </div>
      </div>

      {appointments.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
            <FaCalendarDays className="text-3xl text-base-content/30" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No appointments found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            There are no appointments scheduled yet.
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
                    Patient
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Doctor
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Date
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Time
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Fee
                  </th>
                  <th className="text-xs font-bold uppercase tracking-widest opacity-40 bg-base-100">
                    Payment
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
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment._id}
                    className={`hover:bg-base-200/50 transition-colors duration-200 ${
                      index !== appointments.length - 1
                        ? "border-b border-base-300/30"
                        : ""
                    }`}
                  >
                    <td className="font-semibold text-sm">
                      {appointment.patientName}
                    </td>

                    <td className="text-sm opacity-80">
                      {appointment.doctorName}
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {appointment.appointmentDate}
                    </td>

                    <td className="text-sm opacity-60 font-light">
                      {appointment.appointmentTime}
                    </td>

                    <td>
                      <span className="text-sm font-semibold text-primary">
                        ৳{appointment.consultationFee}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge border-0 text-xs font-medium capitalize ${
                          appointment.paymentStatus === "paid"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {appointment.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge border-0 text-xs font-medium capitalize ${
                          appointment.status === "completed"
                            ? "bg-success/10 text-success"
                            : appointment.status === "confirmed"
                              ? "bg-info/10 text-info"
                              : appointment.status === "cancelled"
                                ? "bg-error/10 text-error"
                                : "bg-warning/10 text-warning"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center justify-end gap-2">
                        {appointment.status === "pending" && (
                          <>
                            <button
                              className="btn btn-sm bg-success/10 text-success border-0 hover:bg-success/20 btn-square"
                              onClick={() =>
                                handleStatusChange(appointment._id, "confirmed")
                              }
                              title="Confirm Appointment"
                            >
                              <FaCircleCheck className="text-xs" />
                            </button>

                            <button
                              className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 btn-square"
                              onClick={() => handleCancel(appointment._id)}
                              title="Cancel Appointment"
                            >
                              <FaCircleXmark className="text-xs" />
                            </button>
                          </>
                        )}

                        {appointment.status === "confirmed" && (
                          <>
                            <button
                              className="btn btn-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 btn-square"
                              onClick={() =>
                                handleStatusChange(appointment._id, "completed")
                              }
                              title="Complete Appointment"
                            >
                              <FaFlagCheckered className="text-xs" />
                            </button>

                            <button
                              className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 btn-square"
                              onClick={() => handleCancel(appointment._id)}
                              title="Cancel Appointment"
                            >
                              <FaCircleXmark className="text-xs" />
                            </button>
                          </>
                        )}

                        {(appointment.status === "completed" ||
                          appointment.status === "cancelled") && (
                          <span className="block text-end text-xs opacity-30 font-light">
                            Processed
                          </span>
                        )}
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

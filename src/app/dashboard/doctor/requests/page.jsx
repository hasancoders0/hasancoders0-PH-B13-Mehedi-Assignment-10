"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaUserInjured,
  FaClock,
  FaMoneyBillAlt,
  FaReceipt,
  FaCheckCircle,
  FaFlagCheckered,
  FaTimesCircle,
  FaCalendarPlus,
  FaStar,
  FaFileMedical,
  FaPen,
  FaNotesMedical,
} from "react-icons/fa";

import useAuth from "@/hooks/useAuth";

import ConfirmModal from "@/components/shared/ConfirmModal";
import RescheduleModal from "@/components/shared/RescheduleModal";

import {
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment,
} from "@/services/appointment.service";

const initialModalState = {
  open: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  confirmClass: "btn-primary",
  onConfirm: null,
};

export default function DoctorRequestsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmModal, setConfirmModal] = useState(initialModalState);
  const [rescheduleModal, setRescheduleModal] = useState({
    open: false,
    appointment: null,
  });

  const closeConfirmModal = () => setConfirmModal(initialModalState);
  const closeRescheduleModal = () =>
    setRescheduleModal({ open: false, appointment: null });

  const loadAppointments = async () => {
    try {
      if (!user?.email) return;
      const data = await getDoctorAppointments(user.email);
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleConfirm = async (id) => {
    try {
      await updateAppointmentStatus(id, "confirmed");
      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = (id) => {
    setConfirmModal({
      open: true,
      title: "Complete Appointment",
      message:
        "You will be redirected to create a prescription after completing this appointment.",
      confirmText: "Complete",
      confirmClass: "btn-primary",
      onConfirm: async () => {
        try {
          await updateAppointmentStatus(id, "completed");
          closeConfirmModal();
          router.push(`/dashboard/doctor/prescriptions/new/${id}`);
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
      confirmText: "Cancel",
      confirmClass: "btn-error",
      onConfirm: async () => {
        try {
          await cancelAppointment(id);
          closeConfirmModal();
          loadAppointments();
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleReschedule = (appointment) => {
    setRescheduleModal({ open: true, appointment });
  };

  const submitReschedule = async (scheduleData) => {
    try {
      await rescheduleAppointment(
        rescheduleModal.appointment._id,
        scheduleData,
      );
      closeRescheduleModal();
      loadAppointments();
    } catch (error) {
      console.error(error);
    }
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
            Appointment Requests
          </h1>
          <p className="text-sm opacity-50 mt-1 font-light">
            Manage incoming and active patient appointments.
          </p>
        </div>

        <div className="bg-base-100 border border-base-300/60 rounded-2xl px-5 py-3 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest opacity-40">
            Total Requests
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
            <FaCalendarAlt className="text-3xl text-primary/50" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            No appointments found
          </h3>
          <p className="opacity-50 mt-2 text-sm font-light">
            You don&apos;t have any appointment requests yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="group bg-base-100 border border-base-300/60 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className={`h-1 ${
                  appointment.status === "completed"
                    ? "bg-success/60"
                    : appointment.status === "confirmed"
                      ? "bg-info/60"
                      : appointment.status === "cancelled"
                        ? "bg-error/60"
                        : "bg-warning/60"
                }`}
              />

              <div className="p-6 lg:p-8">
                {/* Header Info */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FaUserInjured className="text-sm text-primary" />
                      </div>

                      <h2 className="text-xl font-extrabold tracking-tight">
                        {appointment.patientName}
                      </h2>

                      <span
                        className={`badge border-0 text-xs font-medium ${
                          appointment.paymentStatus === "paid"
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {appointment.paymentStatus === "paid"
                          ? "Paid Consultation"
                          : "Unpaid"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-5">
                      <div className="flex items-center gap-2 text-base-content/60">
                        <FaCalendarAlt className="text-xs opacity-60" />
                        <span className="font-light">
                          {appointment.appointmentDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-base-content/60">
                        <FaClock className="text-xs opacity-60" />
                        <span className="font-light">
                          {appointment.appointmentTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <FaMoneyBillAlt className="text-xs" />
                        <span>৳{appointment.consultationFee}</span>
                      </div>
                    </div>

                    {appointment.symptoms && (
                      <div className="bg-base-200/50 border border-base-300/30 rounded-2xl p-4 mb-4 text-sm">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">
                          Symptoms
                        </p>
                        <p className="text-base-content/70 font-light leading-relaxed flex items-start gap-2">
                          <FaNotesMedical className="text-xs opacity-50 mt-1 shrink-0" />
                          {appointment.symptoms}
                        </p>
                      </div>
                    )}

                    {appointment.transactionId && (
                      <div className="flex items-center gap-2 text-xs text-base-content/40 font-mono">
                        <FaReceipt />
                        {appointment.transactionId}
                      </div>
                    )}
                  </div>

                  {/* Right Status Badge */}
                  <div className="shrink-0">
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
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-6 before:bg-base-300/50 after:bg-base-300/50" />

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm bg-success/10 text-success border-0 hover:bg-success/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleConfirm(appointment._id)}
                      >
                        <FaCheckCircle className="text-xs" />
                        Accept
                      </button>

                      <button
                        className="btn btn-sm bg-info/10 text-info border-0 hover:bg-info/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleReschedule(appointment)}
                      >
                        <FaCalendarPlus className="text-xs" />
                        Reschedule
                      </button>

                      <button
                        className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleCancel(appointment._id)}
                      >
                        <FaTimesCircle className="text-xs" />
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === "confirmed" && (
                    <>
                      <button
                        className="btn btn-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleComplete(appointment._id)}
                      >
                        <FaFlagCheckered className="text-xs" />
                        Complete
                      </button>

                      <button
                        className="btn btn-sm bg-info/10 text-info border-0 hover:bg-info/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleReschedule(appointment)}
                      >
                        <FaCalendarPlus className="text-xs" />
                        Reschedule
                      </button>

                      <button
                        className="btn btn-sm bg-error/10 text-error border-0 hover:bg-error/20 gap-2 rounded-xl transition-colors duration-200"
                        onClick={() => handleCancel(appointment._id)}
                      >
                        <FaCircleXmark className="text-xs" />
                        Cancel
                      </button>
                    </>
                  )}

                  {appointment.status === "completed" && (
                    <>
                      {appointment.hasReview && (
                        <button
                          className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200"
                          onClick={() =>
                            router.push(`/dashboard/reviews/${appointment._id}`)
                          }
                        >
                          <FaStar className="text-xs" />
                          View Review
                        </button>
                      )}

                      {appointment.hasPrescription ? (
                        <>
                          <button
                            className="btn btn-sm bg-info/10 text-info border-0 hover:bg-info/20 gap-2 rounded-xl transition-colors duration-200"
                            onClick={() =>
                              router.push(
                                `/dashboard/doctor/prescriptions/${appointment.prescriptionId}`,
                              )
                            }
                          >
                            <FaFileMedical className="text-xs" />
                            View Prescription
                          </button>

                          <button
                            className="btn btn-sm bg-warning/10 text-warning border-0 hover:bg-warning/20 gap-2 rounded-xl transition-colors duration-200"
                            onClick={() =>
                              router.push(
                                `/dashboard/doctor/prescriptions/edit/${appointment.prescriptionId}`,
                              )
                            }
                          >
                            <FaPen className="text-xs" />
                            Edit Prescription
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm bg-primary/10 text-primary border-0 hover:bg-primary/20 gap-2 rounded-xl transition-colors duration-200"
                          onClick={() =>
                            router.push(
                              `/dashboard/doctor/prescriptions/new/${appointment._id}`,
                            )
                          }
                        >
                          <FaFileMedical className="text-xs" />
                          Write Prescription
                        </button>
                      )}
                    </>
                  )}

                  {appointment.status === "cancelled" && (
                    <span className="text-sm opacity-30 font-light italic self-center ml-2">
                      No actions available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        confirmClass={confirmModal.confirmClass}
        onConfirm={confirmModal.onConfirm}
        onClose={closeConfirmModal}
      />

      <RescheduleModal
        isOpen={rescheduleModal.open}
        appointment={rescheduleModal.appointment}
        onClose={closeRescheduleModal}
        onSubmit={submitReschedule}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  const closeConfirmModal = () => {
    setConfirmModal(initialModalState);
  };

  const closeRescheduleModal = () => {
    setRescheduleModal({
      open: false,
      appointment: null,
    });
  };

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
    setRescheduleModal({
      open: true,
      appointment,
    });
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
    return <div className="text-center py-20">Loading appointments...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Appointment Requests</h1>

        <span className="badge badge-lg">Total: {appointments.length}</span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-20">No appointment requests found.</div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="card bg-base-100 shadow border"
            >
              <div className="card-body">
                <div className="flex justify-between gap-6">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold">
                        {appointment.patientName}
                      </h2>

                      <span
                        className={`badge ${
                          appointment.paymentStatus === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {appointment.paymentStatus === "paid"
                          ? "Paid Consultation"
                          : "Unpaid"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-4 text-sm">
                      <span>Date: {appointment.appointmentDate}</span>

                      <span>Time: {appointment.appointmentTime}</span>

                      <span>Fee: ৳{appointment.consultationFee}</span>
                    </div>

                    {appointment.symptoms && (
                      <div className="border rounded p-3">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </div>
                    )}
                    {appointment.transactionId && (
                      <p className="mt-3 text-sm opacity-70">
                        Transaction ID: {appointment.transactionId}
                      </p>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-3">
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
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="flex flex-wrap gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleConfirm(appointment._id)}
                      >
                        Accept
                      </button>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleCancel(appointment._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === "confirmed" && (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleComplete(appointment._id)}
                      >
                        Complete
                      </button>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleCancel(appointment._id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {appointment.status === "completed" && (
                    <>
                      {appointment.hasReview && (
                        <button
                          className="btn btn-accent btn-sm"
                          onClick={() =>
                            router.push(`/dashboard/reviews/${appointment._id}`)
                          }
                        >
                          View Review
                        </button>
                      )}

                      {appointment.hasPrescription ? (
                        <>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() =>
                              router.push(
                                `/dashboard/doctor/prescriptions/${appointment.prescriptionId}`,
                              )
                            }
                          >
                            View Prescription
                          </button>

                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              router.push(
                                `/dashboard/doctor/prescriptions/edit/${appointment.prescriptionId}`,
                              )
                            }
                          >
                            Edit Prescription
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/doctor/prescriptions/new/${appointment._id}`,
                            )
                          }
                        >
                          Write Prescription
                        </button>
                      )}
                    </>
                  )}

                  {appointment.status === "cancelled" && (
                    <span className="text-sm opacity-70">
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

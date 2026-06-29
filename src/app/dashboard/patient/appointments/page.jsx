"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";

import ConfirmModal from "@/components/shared/ConfirmModal";
import RescheduleModal from "@/components/shared/RescheduleModal";

import {
  getMyAppointments,
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

export default function PatientAppointmentsPage() {
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

      const data = await getMyAppointments(user.email);

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Appointments</h1>

        <span className="badge badge-lg">Total: {appointments.length}</span>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-20">No appointments found.</div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="card bg-base-100 shadow border"
            >
              <div className="card-body">
                <div className="flex justify-between items-start gap-6">
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold">
                        {appointment.doctorName}
                      </h2>

                      {appointment.specialization && (
                        <span className="badge badge-outline">
                          {appointment.specialization}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-6 mb-4 text-sm">
                      <span>Date: {appointment.appointmentDate}</span>

                      <span>Time: {appointment.appointmentTime}</span>

                      <span>Fee: ৳{appointment.consultationFee}</span>
                    </div>

                    {appointment.symptoms && (
                      <div className="border rounded p-3 mb-4">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </div>
                    )}

                    {appointment.transactionId && (
                      <p className="text-sm opacity-70">
                        Transaction ID: {appointment.transactionId}
                      </p>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`badge ${
                        appointment.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {appointment.paymentStatus}
                    </span>

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
                  {appointment.paymentStatus === "unpaid" &&
                    appointment.status !== "cancelled" && (
                      <Link
                        href={`/payment/${appointment._id}`}
                        className="btn btn-success btn-sm"
                      >
                        Pay Now
                      </Link>
                    )}

                  {(appointment.status === "pending" ||
                    appointment.status === "confirmed") && (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleReschedule(appointment)}
                      >
                        Reschedule
                      </button>

                      <button
                        onClick={() => handleCancel(appointment._id)}
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {appointment.hasPrescription &&
                    appointment.prescriptionId && (
                      <Link
                        href={`/dashboard/patient/prescriptions/${appointment.prescriptionId}`}
                        className="btn btn-info btn-sm"
                      >
                        View Prescription
                      </Link>
                    )}

                  {appointment.status === "completed" && (
                    <>
                      {appointment.hasReview ? (
                        <>
                          <Link
                            href={`/dashboard/reviews/${appointment._id}`}
                            className="btn btn-info btn-sm"
                          >
                            View Review
                          </Link>

                          {appointment.reviewId && (
                            <Link
                              href={`/dashboard/patient/reviews/edit/${appointment.reviewId}`}
                              className="btn btn-warning btn-sm"
                            >
                              Edit Review
                            </Link>
                          )}
                        </>
                      ) : (
                        <Link
                          href={`/dashboard/patient/reviews/new/${appointment._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Write Review
                        </Link>
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

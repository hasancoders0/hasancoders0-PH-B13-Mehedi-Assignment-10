"use client";

import { useState } from "react";
import {
  FaCalendarDays,
  FaClock,
  FaCalendarPlus,
  FaFloppyDisk,
  FaXmark,
} from "react-icons/fa6";

export default function RescheduleModal({
  isOpen,
  appointment,
  onClose,
  onSubmit,
}) {
  const [date, setDate] = useState(appointment?.appointmentDate || "");
  const [time, setTime] = useState(appointment?.appointmentTime || "");

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      appointmentDate: date,
      appointmentTime: time,
    });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box rounded-3xl border-0 shadow-2xl p-0 max-w-md overflow-hidden bg-base-100">
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-info" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center shrink-0">
              <FaCalendarPlus className="text-xl text-info" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Reschedule Appointment
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  New Date
                </span>
              </label>
              <div className="relative">
                <FaCalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  type="date"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Time Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  New Time
                </span>
              </label>
              <div className="relative">
                <FaClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  type="time"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost flex-1 rounded-xl hover:bg-base-200 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-info flex-1 rounded-xl shadow-lg shadow-info/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
              >
                <FaFloppyDisk className="text-sm" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Backdrop & Close Button */}
      <form
        method="dialog"
        className="modal-backdrop bg-black/40 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle bg-base-100/10 border-0 text-white hover:bg-base-100/20 transition-colors duration-200"
        >
          <FaXmark className="text-lg" />
        </button>
      </form>
    </dialog>
  );
}

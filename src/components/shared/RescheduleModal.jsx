"use client";

import { useState } from "react";

export default function RescheduleModal({
  isOpen,
  appointment,
  onClose,
  onSubmit,
}) {
  const [date, setDate] = useState(
    appointment?.appointmentDate || ""
  );

  const [time, setTime] = useState(
    appointment?.appointmentTime || ""
  );

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

      <div className="modal-box">

        <h3 className="text-xl font-bold mb-6">
          Reschedule Appointment
        </h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="label">
              <span className="label-text">
                New Date
              </span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />

          </div>

          <div>

            <label className="label">
              <span className="label-text">
                New Time
              </span>
            </label>

            <input
              type="time"
              className="input input-bordered w-full"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              required
            />

          </div>

          <div className="modal-action">

            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </dialog>
  );
}
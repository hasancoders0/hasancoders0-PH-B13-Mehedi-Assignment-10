"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";

import {
  getDoctorByEmail,
  updateDoctorSchedule,
} from "@/services/doctor.service";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function DoctorSchedulePage() {
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);

  const [availableDays, setAvailableDays] = useState([]);

  const [availableTimes, setAvailableTimes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        if (!user?.email) return;

        const doctorData = await getDoctorByEmail(user.email);

        setDoctor(doctorData);

        setAvailableDays(doctorData.availableDays || []);

        setAvailableTimes(doctorData.availableTimes || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [user]);

  const toggleDay = (day) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day],
    );
  };

  const toggleTime = (time) => {
    setAvailableTimes((prev) =>
      prev.includes(time)
        ? prev.filter((item) => item !== time)
        : [...prev, time],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (availableDays.length === 0) {
      toast.error("Please select at least one day.");

      return;
    }

    if (availableTimes.length === 0) {
      toast.error("Please select at least one time slot.");

      return;
    }

    try {
      setSaving(true);

      await updateDoctorSchedule(doctor._id, {
        availableDays,
        availableTimes,
      });

      toast.success("Schedule updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update schedule.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading schedule...</div>;
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Manage Schedule</h1>

      <p className="text-gray-500 mb-8">
        Select your available days and consultation time slots.
      </p>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Available Days</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DAYS.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={availableDays.includes(day)}
                    onChange={() => toggleDay(day)}
                  />

                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TIMES.map((time) => (
                <label
                  key={time}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={availableTimes.includes(time)}
                    onChange={() => toggleTime(time)}
                  />

                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-fit"
          >
            {saving ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaClock,
  FaFloppyDisk,
  FaCheck,
} from "react-icons/fa6";

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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Manage Schedule
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Select your available days and consultation time slots.
        </p>
      </div>

      {/* Schedule Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10 space-y-10"
      >
        {/* Available Days */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <FaCalendarDays className="text-sm text-primary" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">Available Days</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DAYS.map((day) => {
              const isActive = availableDays.includes(day);
              return (
                <label
                  key={day}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 font-medium text-sm ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "border-base-300/60 hover:border-primary/50 hover:bg-primary/5 text-base-content/70"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isActive}
                    onChange={() => toggleDay(day)}
                  />
                  {isActive && <FaCheck className="text-xs" />}
                  <span>{day}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Available Time Slots */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <FaClock className="text-sm text-primary" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">
              Available Time Slots
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIMES.map((time) => {
              const isActive = availableTimes.includes(time);
              return (
                <label
                  key={time}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 font-medium text-sm ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "border-base-300/60 hover:border-primary/50 hover:bg-primary/5 text-base-content/70"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isActive}
                    onChange={() => toggleTime(time)}
                  />
                  {isActive && <FaCheck className="text-xs" />}
                  <span>{time}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaFloppyDisk className="text-sm" />
            )}
            {saving ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </form>
    </div>
  );
}

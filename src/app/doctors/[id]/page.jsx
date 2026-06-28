"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import { getDoctorById } from "@/services/doctor.service";
import { createAppointment } from "@/services/appointment.service";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (id) {
      getDoctorById(id).then(setDoctor);
    }
  }, [id]);

  const handleBookAppointment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    try {
      const appointmentData = {
        doctorId: doctor._id,
        doctorName: doctor.name,
        patientEmail: user.email,
        appointmentDate: date,
        appointmentTime: time,
      };

      await createAppointment(appointmentData);

      alert("Appointment booked successfully!");

      setDate("");
      setTime("");
    } catch (error) {
      console.error(error);
      alert("Failed to create appointment");
    }
  };

  if (!doctor) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold">
            {doctor.name}
          </h1>

          <p className="text-lg mt-2">
            {doctor.specialty}
          </p>

          <p className="mt-2">
            Hospital: {doctor.hospital}
          </p>

          <p>
            Experience: {doctor.experience} years
          </p>

          <div className="mt-8 space-y-4">
            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <select
              className="select select-bordered w-full"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            >
              <option value="">
                Select Time
              </option>

              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
            </select>

            <button
              onClick={handleBookAppointment}
              className="btn btn-primary w-full"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
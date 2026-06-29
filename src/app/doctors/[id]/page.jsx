"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import { getDoctorById } from "@/services/doctor.service";
import { createAppointment } from "@/services/appointment.service";
import { getDoctorReviews } from "@/services/review.service";

export default function DoctorDetailsPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const doctorData = await getDoctorById(id);

        setDoctor(doctorData);

        const reviewData = await getDoctorReviews(id);

        setReviews(reviewData.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [id]);

  const handleBookAppointment = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (!date || !time) {
      toast.error("Please select appointment date and time.");

      return;
    }

    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms.");

      return;
    }

    try {
      setBookingLoading(true);

      const appointmentData = {
        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorEmail: doctor.email,

        specialization: doctor.specialization,

        patientName: user.displayName || "Patient",

        patientEmail: user.email,

        appointmentDate: date,
        appointmentTime: time,

        symptoms,

        consultationFee: doctor.consultationFee,
      };

      await createAppointment(appointmentData);

      toast.success("Appointment booked successfully!");

      setDate("");
      setTime("");
      setSymptoms("");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create appointment.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (!doctor) {
    return <div className="text-center py-20">Loading doctor details...</div>;
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side */}

        <div className="lg:col-span-2 space-y-8">
          {/* Doctor Information */}

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={
                    doctor.photoURL ||
                    doctor.image ||
                    "https://placehold.co/300x300"
                  }
                  alt={doctor.name}
                  className="w-52 h-52 rounded-xl object-cover border"
                />

                <div>
                  <h1 className="text-4xl font-bold">{doctor.name}</h1>

                  <div className="badge badge-success mt-3">
                    {doctor.specialization}
                  </div>

                  <div className="space-y-3 mt-6">
                    <p>
                      <strong>Qualifications:</strong>{" "}
                      {doctor.qualification || "Not provided"}
                    </p>

                    <p>
                      <strong>Experience:</strong> {doctor.experience} years
                    </p>

                    <p>
                      <strong>Hospital:</strong>{" "}
                      {doctor.hospital || "Not specified"}
                    </p>

                    <p>
                      <strong>Consultation Fee:</strong> ৳
                      {doctor.consultationFee}
                    </p>

                    <p>
                      <strong>Rating:</strong> ⭐ {averageRating}/5 (
                      {reviews.length} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">
                Patient Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="border rounded-xl p-4">
                      <h3 className="font-semibold">{review.patientName}</h3>

                      <p className="text-warning">⭐ {review.rating}/5</p>

                      <p className="mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div>
          <div className="card bg-base-100 shadow-xl sticky top-24">
            <div className="card-body">
              <h2 className="text-2xl font-bold">Book Appointment</h2>

              <p className="text-sm text-gray-500">
                Select a date, time, and describe your symptoms.
              </p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Available Days</h4>

                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays?.length > 0 ? (
                    doctor.availableDays.map((day) => (
                      <span
                        key={day}
                        className="badge badge-outline badge-success"
                      >
                        {day}
                      </span>
                    ))
                  ) : (
                    <span>No schedule available</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                />

                <select
                  className="select select-bordered w-full"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select Time Slot</option>

                  {doctor.availableTimes?.length > 0 ? (
                    doctor.availableTimes.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))
                  ) : (
                    <option disabled>No time slots available</option>
                  )}
                </select>

                <textarea
                  rows={4}
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />

                <button
                  onClick={handleBookAppointment}
                  disabled={bookingLoading}
                  className="btn btn-primary w-full"
                >
                  {bookingLoading
                    ? "Booking..."
                    : `Book Appointment (৳${doctor.consultationFee})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

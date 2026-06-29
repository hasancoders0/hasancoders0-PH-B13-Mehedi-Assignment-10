"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaHospital,
  FaMoneyBillAlt,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaCalendarCheck,
  FaCommentDots,
  FaExclamationCircle,
  FaStethoscope,
} from "react-icons/fa";

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
  const [pageLoading, setPageLoading] = useState(true);

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
      } finally {
        setPageLoading(false);
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

      await createAppointment({
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
      });

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

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-error/10 flex items-center justify-center mb-6">
          <FaExclamationCircle className="text-3xl text-error" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Doctor not found</h3>
        <p className="opacity-50 mt-2 text-sm font-light">
          The doctor profile you are looking for does not exist.
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const details = [
    {
      icon: FaGraduationCap,
      label: "Qualifications",
      value: doctor.qualification || "Not provided",
    },
    {
      icon: FaBriefcase,
      label: "Experience",
      value: `${doctor.experience} Years`,
    },
    {
      icon: FaHospital,
      label: "Hospital",
      value: doctor.hospital || "Not specified",
    },
    {
      icon: FaMoneyBillAlt,
      label: "Consultation Fee",
      value: `৳${doctor.consultationFee}`,
      isPrimary: true,
    },
    {
      icon: FaStar,
      label: "Average Rating",
      value: `${averageRating}/5 (${reviews.length} reviews)`,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-base-100 to-base-200/50 py-16 lg:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Info & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Information Card */}
            <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image */}
                  <div className="shrink-0 mx-auto md:mx-0">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden ring-4 ring-base-200 shadow-xl border-4 border-base-100">
                      <img
                        src={
                          doctor.photoURL ||
                          doctor.image ||
                          "https://placehold.co/300x300"
                        }
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                        {doctor.name}
                      </h1>
                    </div>

                    <span className="inline-flex items-center gap-1.5 bg-success/10 text-success border border-success/20 rounded-full px-4 py-1.5 text-xs font-semibold w-fit mx-auto md:mx-0">
                      <FaStethoscope className="text-[10px]" />
                      {doctor.specialization}
                    </span>

                    {/* Details Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      {details.map(
                        ({ icon: Icon, label, value, isPrimary }) => (
                          <div key={label} className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl ${isPrimary ? "bg-primary/10" : "bg-base-200"} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                              <Icon
                                className={`text-sm ${isPrimary ? "text-primary" : "text-base-content/50"}`}
                              />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">
                                {label}
                              </p>
                              <p
                                className={`text-sm font-semibold mt-0.5 ${isPrimary ? "text-primary" : "text-base-content/80"}`}
                              >
                                {value}
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Card */}
            <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaCommentDots className="text-lg text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">
                  Patient Reviews ({reviews.length})
                </h2>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-10 bg-base-200/30 rounded-2xl border border-dashed border-base-300/50">
                  <FaCommentDots className="text-3xl text-base-content/20 mx-auto mb-3" />
                  <p className="text-sm opacity-50 font-light">
                    No reviews yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-base-200/50 border border-base-300/30 rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-sm">
                          {review.patientName}
                        </h3>
                        <div className="flex items-center gap-1 text-warning">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-xs ${
                                i < review.rating
                                  ? "text-warning"
                                  : "text-base-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm opacity-60 font-light leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 sticky top-24">
              <h2 className="text-xl font-bold tracking-tight mb-2">
                Book Appointment
              </h2>
              <p className="text-sm opacity-50 font-light mb-6">
                Select date, time, and describe your symptoms.
              </p>

              {/* Available Days */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">
                  Available Days
                </p>
                {doctor.availableDays?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableDays.map((day) => (
                      <span
                        key={day}
                        className="bg-success/10 text-success border-0 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm opacity-40 font-light">
                    No schedule set.
                  </p>
                )}
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="form-control">
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 text-lg z-10" />
                    <input
                      type="date"
                      className="input input-bordered w-full pl-12 rounded-xl focus:input-primary transition-colors duration-200"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <div className="relative">
                    <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 text-lg z-10" />
                    <select
                      className="select select-bordered w-full pl-10 rounded-xl focus:select-primary transition-colors duration-200 appearance-none"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Time Slot
                      </option>
                      {doctor.availableTimes?.length > 0 ? (
                        doctor.availableTimes.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))
                      ) : (
                        <option disabled>No slots available</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <div className="relative">
                    <FaNotesMedical className="absolute left-4 top-4 text-primary/70 text-lg z-10" />
                    <textarea
                      rows={4}
                      className="textarea textarea-bordered w-full pl-12 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
                      placeholder="Describe your symptoms..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={handleBookAppointment}
                  disabled={bookingLoading}
                  className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
                >
                  {bookingLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FaCalendarCheck className="text-sm" />
                  )}
                  {bookingLoading
                    ? "Processing..."
                    : `Book for ৳${doctor.consultationFee}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

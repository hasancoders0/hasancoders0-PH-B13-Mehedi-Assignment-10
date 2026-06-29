"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaStethoscope,
  FaGraduationCap,
  FaHospital,
  FaBriefcase,
  FaMoneyBillWave,
  FaImage,
  FaFileLines,
  FaFloppyDisk,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";

import {
  getDoctorByEmail,
  updateDoctorProfile,
} from "@/services/doctor.service";

export default function DoctorProfilePage() {
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    qualification: "",
    hospital: "",
    experience: "",
    consultationFee: "",
    photoURL: "",
    about: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        if (!user?.email) return;

        const doctorData = await getDoctorByEmail(user.email);

        setDoctor(doctorData);

        setFormData({
          name: doctorData.name || "",
          specialization: doctorData.specialization || "",
          qualification: doctorData.qualification || "",
          hospital: doctorData.hospital || "",
          experience: doctorData.experience || "",
          consultationFee: doctorData.consultationFee || "",
          photoURL: doctorData.photoURL || "",
          about: doctorData.about || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateDoctorProfile(doctor._id, formData);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile.");
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
        <h1 className="text-3xl font-extrabold tracking-tight">Doctor Profile</h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Update your professional information and profile.
        </p>
      </div>

      {/* Profile Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10 space-y-8"
      >
        {/* Avatar Section */}
        {formData.photoURL && (
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={formData.photoURL}
                alt={formData.name}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-base-200 shadow-xl border-4 border-base-100 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <FaImage className="text-white text-xl" />
              </div>
            </div>
          </div>
        )}

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Full Name</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="Dr. John Doe"
              />
            </div>
          </div>

          {/* Email (Disabled) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Email Address</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="email"
                value={doctor?.email}
                disabled
                className="input input-bordered w-full pl-10 rounded-xl opacity-50 cursor-not-allowed bg-base-200"
              />
            </div>
          </div>

          {/* Specialization */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Specialization</span>
            </label>
            <div className="relative">
              <FaStethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="text"
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="e.g., Cardiologist"
              />
            </div>
          </div>

          {/* Qualification */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Qualification</span>
            </label>
            <div className="relative">
              <FaGraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="text"
                name="qualification"
                required
                value={formData.qualification}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="e.g., MBBS, FCPS"
              />
            </div>
          </div>

          {/* Hospital */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Hospital / Clinic</span>
            </label>
            <div className="relative">
              <FaHospital className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="text"
                name="hospital"
                required
                value={formData.hospital}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="e.g., Square Hospital"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Experience (Years)</span>
            </label>
            <div className="relative">
              <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="number"
                min="0"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Consultation Fee (৳)</span>
            </label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="number"
                min="0"
                name="consultationFee"
                required
                value={formData.consultationFee}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="e.g., 800"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">Profile Photo URL</span>
            </label>
            <div className="relative">
              <FaImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-medium opacity-60">Professional Bio</span>
          </label>
          <div className="relative">
            <FaFileLines className="absolute left-3.5 top-4 text-primary/70 text-xl z-10" />
            <textarea
              rows={5}
              name="about"
              required
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
              placeholder="Write a short professional biography..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaFloppyDisk className="text-sm" />
            )}
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaImage,
  FaLocationDot,
  FaFloppyDisk,
} from "react-icons/fa6";

import useAuth from "@/hooks/useAuth";

import { getUserByEmail, updateUserProfile } from "@/services/user.service";

export default function PatientProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
    gender: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!user?.email) return;

        const data = await getUserByEmail(user.email);

        setProfile(data);

        setFormData({
          displayName: data.displayName || "",
          photoURL: data.photoURL || "",
          phone: data.phone || "",
          gender: data.gender || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
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

      await updateUserProfile(profile._id, formData);

      toast.success("Profile updated successfully.");
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
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Update your personal information.
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
                alt={formData.displayName}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-base-200 shadow-xl border-4 border-base-100 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
              <span className="label-text text-xs font-medium opacity-60">
                Full Name
              </span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="text"
                name="displayName"
                required
                value={formData.displayName}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email (Disabled) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Email Address
              </span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="email"
                value={profile?.email}
                disabled
                className="input input-bordered w-full pl-10 rounded-xl opacity-50 cursor-not-allowed bg-base-200"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Phone Number
              </span>
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                placeholder="+8801XXXXXXXXX"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Gender
              </span>
            </label>
            <div className="relative">
              <FaVenusMars className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10 z-10" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full pl-10 rounded-xl focus:select-primary transition-colors duration-200 appearance-none"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                Profile Photo URL
              </span>
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

        {/* Address */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-medium opacity-60">
              Address
            </span>
          </label>
          <div className="relative">
            <FaLocationDot className="absolute left-3.5 top-4 text-primary/70 text-xl z-10" />
            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
              placeholder="Enter your full address..."
            />
          </div>
        </div>

        {/* Submit Button */}
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
      </form>
    </div>
  );
}

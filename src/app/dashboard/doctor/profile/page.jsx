"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Doctor Profile</h1>

        <p className="opacity-70 mt-2">
          Update your professional information and profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow border">
        <div className="card-body space-y-6">
          {formData.photoURL && (
            <div className="flex justify-center">
              <img
                src={formData.photoURL}
                alt={formData.name}
                className="w-32 h-32 rounded-xl object-cover border"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Name</label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Email</label>

              <input
                type="email"
                value={doctor?.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Specialization</label>

              <input
                type="text"
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Qualification</label>

              <input
                type="text"
                name="qualification"
                required
                value={formData.qualification}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Hospital</label>

              <input
                type="text"
                name="hospital"
                required
                value={formData.hospital}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Experience (Years)</label>

              <input
                type="number"
                min="0"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Consultation Fee (৳)</label>

              <input
                type="number"
                min="0"
                name="consultationFee"
                required
                value={formData.consultationFee}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Photo URL</label>

              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="label">About</label>

            <textarea
              rows={6}
              name="about"
              required
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write a short professional biography..."
            />
          </div>

          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

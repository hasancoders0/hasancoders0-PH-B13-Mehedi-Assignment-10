"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="opacity-70 mt-2">Update your personal information.</p>
      </div>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow border">
        <div className="card-body space-y-6">
          {formData.photoURL && (
            <div className="flex justify-center">
              <img
                src={formData.photoURL}
                alt={formData.displayName}
                className="w-32 h-32 rounded-full object-cover border"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Full Name</label>

              <input
                type="text"
                name="displayName"
                required
                value={formData.displayName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Email</label>

              <input
                type="email"
                value={profile?.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="+8801XXXXXXXXX"
              />
            </div>

            <div>
              <label className="label">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Photo URL</label>

              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div>
            <label className="label">Address</label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Enter your full address..."
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

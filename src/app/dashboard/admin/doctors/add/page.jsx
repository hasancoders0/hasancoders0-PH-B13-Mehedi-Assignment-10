"use client";

import { useRouter } from "next/navigation";
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
  FaUserPlus,
} from "react-icons/fa6";

import { addDoctor } from "@/services/admin-doctor.service";

export default function AddDoctorPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const doctorData = {
      name: form.name.value,
      email: form.email.value,
      specialization: form.specialization.value,
      hospital: form.hospital.value,
      experience: form.experience.value,
      consultationFee: Number(form.consultationFee.value),
      photoURL: form.photoURL.value,
      qualification: form.qualification.value,
      about: form.about.value,
      availableDays: [],
      availableTimes: [],
      createdAt: new Date(),
    };

    try {
      await addDoctor(doctorData);
      toast.success("Doctor added successfully!");
      router.push("/dashboard/admin/doctors");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add doctor.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Add New Doctor
        </h1>
        <p className="text-sm opacity-50 mt-1 font-light">
          Fill in the details to manually register a new doctor.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-base-100 border border-base-300/60 rounded-3xl shadow-sm p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="name"
                  type="text"
                  placeholder="Dr. John Doe"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="email"
                  type="email"
                  placeholder="doctor@example.com"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Specialization & Qualification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Specialization
                </span>
              </label>
              <div className="relative">
                <FaStethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="specialization"
                  type="text"
                  placeholder="e.g., Cardiologist"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Qualification
                </span>
              </label>
              <div className="relative">
                <FaGraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="qualification"
                  type="text"
                  placeholder="e.g., MBBS, FCPS"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Hospital & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Hospital / Clinic
                </span>
              </label>
              <div className="relative">
                <FaHospital className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="hospital"
                  type="text"
                  placeholder="e.g., Square Hospital"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Experience
                </span>
              </label>
              <div className="relative">
                <FaBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="experience"
                  type="text"
                  placeholder="e.g., 5 Years"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Fee & Photo URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Consultation Fee (৳)
                </span>
              </label>
              <div className="relative">
                <FaMoneyBillWave className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="consultationFee"
                  type="number"
                  placeholder="e.g., 800"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-medium opacity-60">
                  Profile Photo URL
                </span>
              </label>
              <div className="relative">
                <FaImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/70 text-xl z-10" />
                <input
                  name="photoURL"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Row 5: About */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-medium opacity-60">
                About Doctor
              </span>
            </label>
            <div className="relative">
              <FaFileLines className="absolute left-3.5 top-4 text-primary/70 text-xl z-10" />
              <textarea
                name="about"
                rows={4}
                placeholder="Write a short bio about the doctor's background and expertise..."
                className="textarea textarea-bordered w-full pl-10 rounded-xl focus:textarea-primary transition-colors duration-200 leading-relaxed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 gap-2"
          >
            <FaUserPlus className="text-sm" />
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

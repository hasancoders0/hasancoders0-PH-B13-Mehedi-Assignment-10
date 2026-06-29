"use client";

import {
  HiBriefcase,
  HiAcademicCap,
  HiBuildingOffice2,
  HiClock,
  HiBanknotes,
  HiShieldCheck,
  HiPhoto,
  HiDocumentText,
} from "react-icons/hi2";

export default function DoctorFields() {
  const iconClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/70 z-10";

  return (
    <div className="space-y-5">
      {/* Professional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Specialization
            </span>
          </label>

          <div className="relative">
            <HiBriefcase className={iconClass} />

            <input
              name="specialization"
              type="text"
              placeholder="e.g., Cardiologist"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Qualification
            </span>
          </label>

          <div className="relative">
            <HiAcademicCap className={iconClass} />

            <input
              name="qualification"
              type="text"
              placeholder="e.g., MBBS, FCPS"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Hospital / Clinic
            </span>
          </label>

          <div className="relative">
            <HiBuildingOffice2 className={iconClass} />

            <input
              name="hospital"
              type="text"
              placeholder="e.g., Square Hospital"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>
      </div>

      {/* Practice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">Experience</span>
          </label>

          <div className="relative">
            <HiClock className={iconClass} />

            <input
              name="experience"
              type="text"
              placeholder="e.g., 5 Years"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Consultation Fee (৳)
            </span>
          </label>

          <div className="relative">
            <HiBanknotes className={iconClass} />

            <input
              name="consultationFee"
              type="number"
              placeholder="e.g., 800"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Medical License No.
            </span>
          </label>

          <div className="relative">
            <HiShieldCheck className={iconClass} />

            <input
              name="licenseNumber"
              type="text"
              placeholder="e.g., MDA-12345"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>
      </div>

      {/* Photo URL */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm font-medium">
            Profile Photo URL
          </span>
        </label>

        <div className="relative">
          <HiPhoto className={iconClass} />

          <input
            name="photoURL"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            className="input input-bordered w-full pl-12 rounded-xl"
          />
        </div>
      </div>

      {/* About */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm font-medium">About Yourself</span>
        </label>

        <div className="relative">
          <HiDocumentText className="absolute left-4 top-4 text-xl text-primary/70 z-10" />

          <textarea
            name="about"
            rows={4}
            placeholder="Write a short bio about your medical background and expertise..."
            className="textarea textarea-bordered w-full pl-12 rounded-xl leading-relaxed"
            required
          />
        </div>
      </div>
    </div>
  );
}

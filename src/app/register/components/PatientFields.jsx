"use client";

import {
  HiUser,
  HiEnvelope,
  HiLockClosed,
  HiFingerPrint,
} from "react-icons/hi2";

export default function PatientFields() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text text-sm font-medium">Full Name</span>
          </label>

          <div className="relative">
            <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/70 z-10" />

            <input
              name="name"
              type="text"
              placeholder="e.g., John Doe"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Email Address
            </span>
          </label>

          <div className="relative">
            <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/70 z-10" />

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">Password</span>
          </label>

          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/70 z-10" />

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm font-medium">
              Confirm Password
            </span>
          </label>

          <div className="relative">
            <HiFingerPrint className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/70 z-10" />

            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-12 rounded-xl"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

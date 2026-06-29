"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  HiMagnifyingGlass,
  HiArrowPath,
  HiArrowRight,
  HiBuildingOffice2,
  HiBriefcase,
  HiStar,
  HiUserGroup,
} from "react-icons/hi2";

import { getDoctors } from "@/services/doctor.service";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 6;

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, specialization, sortBy]);

  const specializations = [
    ...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean)),
  ];

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors];

    if (search) {
      filtered = filtered.filter((doctor) =>
        doctor.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (specialization) {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === specialization,
      );
    }

    if (sortBy === "feeLow") {
      filtered.sort(
        (a, b) =>
          Number(a.consultationFee || 0) - Number(b.consultationFee || 0),
      );
    }

    if (sortBy === "feeHigh") {
      filtered.sort(
        (a, b) =>
          Number(b.consultationFee || 0) - Number(a.consultationFee || 0),
      );
    }

    return filtered;
  }, [doctors, search, specialization, sortBy]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const startIndex = (currentPage - 1) * doctorsPerPage;

  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage,
  );

  const resetFilters = () => {
    setSearch("");
    setSpecialization("");
    setSortBy("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-base-100 to-base-200 min-h-screen">
      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        {/* Page Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <HiUserGroup className="text-sm" />
            Our Specialists
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Find Doctors
            <br />
            <span className="text-base-content/40">Browse & Book</span>
          </h1>

          <p className="mt-4 text-base opacity-50 leading-8 font-light max-w-lg">
            Search and connect with trusted healthcare professionals tailored to
            your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-base-100 border border-base-300/60 rounded-3xl p-6 shadow-sm mb-10">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="form-control">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/30 text-lg" />
                <input
                  type="text"
                  placeholder="Search doctor name..."
                  className="input input-bordered w-full pl-10 rounded-xl focus:input-primary transition-colors duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <select
              className="select select-bordered w-full rounded-xl focus:select-primary transition-colors duration-200"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value="">All Specializations</option>
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full rounded-xl focus:select-primary transition-colors duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="feeLow">Fee: Low to High</option>
              <option value="feeHigh">Fee: High to Low</option>
            </select>

            <button
              onClick={resetFilters}
              className="btn btn-outline gap-2 rounded-xl hover:bg-base-200 transition-all duration-200"
            >
              <HiArrowPath className="text-base" />
              Reset
            </button>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        {paginatedDoctors.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="group bg-base-100 border border-base-300/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Top Accent Line */}
                  <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={
                              doctor.photoURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0D8ABC&color=fff`
                            }
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full ring-2 ring-base-100" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-bold tracking-tight truncate">
                          {doctor.name}
                        </h2>
                        <p className="text-sm text-primary font-medium truncate">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-5 space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 opacity-60">
                        <HiBuildingOffice2 className="text-base shrink-0" />
                        <span className="truncate">
                          {doctor.hospital || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 opacity-60">
                        <HiBriefcase className="text-base shrink-0" />
                        <span>{doctor.experience || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2.5 opacity-60">
                        <HiStar className="text-warning text-base shrink-0" />
                        <span>4.9 Rating</span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Footer / CTA */}
                    <div className="mt-5 pt-5 border-t border-base-300/50 flex items-end justify-between">
                      <div>
                        <p className="text-[11px] opacity-40 font-light uppercase tracking-wider">
                          Consultation
                        </p>
                        <h4 className="text-xl font-extrabold text-primary leading-tight mt-0.5">
                          ৳{doctor.consultationFee}
                        </h4>
                      </div>

                      <Link
                        href={`/doctors/${doctor._id}`}
                        className="btn btn-primary btn-sm gap-1 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                      >
                        Profile
                        <HiArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-14">
                <div className="join">
                  <button
                    className="join-item btn btn-sm rounded-l-xl"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`join-item btn btn-sm ${
                        currentPage === index + 1
                          ? "bg-primary text-primary-content border-primary hover:bg-primary hover:text-primary-content"
                          : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="join-item btn btn-sm rounded-r-xl"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-base-200 flex items-center justify-center mb-6">
              <HiMagnifyingGlass className="text-3xl text-base-content/30" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              No doctors found
            </h3>
            <p className="opacity-50 mt-2 text-sm font-light max-w-sm">
              We couldn&apos;t find any doctors matching your criteria. Try
              adjusting your search or filters.
            </p>
            <button
              onClick={resetFilters}
              className="btn btn-primary btn-sm gap-2 mt-6 shadow-lg shadow-primary/20"
            >
              <HiArrowPath className="text-base" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

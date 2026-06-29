"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
    return <div className="text-center py-20">Loading doctors...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Find Doctors</h1>

        <p className="mt-3 opacity-70">
          Search and connect with trusted healthcare professionals.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-10">
        <input
          type="text"
          placeholder="Search doctor..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
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
          className="select select-bordered w-full"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>

          <option value="feeLow">Fee: Low to High</option>

          <option value="feeHigh">Fee: High to Low</option>
        </select>

        <button onClick={resetFilters} className="btn btn-outline">
          Reset Filters
        </button>
      </div>

      {/* Doctor Cards */}
      {paginatedDoctors.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-base-100 border shadow-md hover:shadow-xl transition"
              >
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img
                          src={
                            doctor.photoURL ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(doctor.name)
                          }
                          alt={doctor.name}
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">{doctor.name}</h2>

                      <p className="text-primary">{doctor.specialization}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <strong>Hospital:</strong> {doctor.hospital || "N/A"}
                    </p>

                    <p>
                      <strong>Experience:</strong> {doctor.experience || "N/A"}
                    </p>

                    <p>
                      <strong>Consultation Fee:</strong> ৳
                      {doctor.consultationFee}
                    </p>
                  </div>

                  <div className="card-actions mt-6">
                    <Link
                      href={`/doctors/${doctor._id}`}
                      className="btn btn-primary w-full"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => (
                    <button
                      key={index}
                      className={`join-item btn ${
                        currentPage === index + 1 ? "btn-primary" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                <button
                  className="join-item btn"
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
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold">No doctors found</h3>

          <p className="opacity-70 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

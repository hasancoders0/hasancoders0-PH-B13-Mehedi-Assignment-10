"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  HiArrowRight,
  HiStar,
  HiBuildingOffice2,
  HiBriefcase,
} from "react-icons/hi2";

import { getDoctors } from "@/services/doctor.service";

export default function TopDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data.slice(0, 8));
      } catch (error) {
        console.error(error);
      }
    };

    loadDoctors();
  }, []);

  return (
    <section className="relative py-28 bg-base-100 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              Our Specialists
            </span>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Meet Our Expert
              <br />
              <span className="text-base-content/40">Doctors</span>
            </h2>

            <p className="mt-5 text-base opacity-50 leading-8 font-light max-w-lg">
              Choose from experienced healthcare professionals dedicated to
              providing the best medical care.
            </p>
          </div>

          <Link
            href="/find-doctors"
            className="btn btn-primary btn-md gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 self-start lg:self-auto"
          >
            View All Doctors
            <HiArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:bg-base-300 [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-button-next]:!w-10 [&_.swiper-button-next]:!h-10 [&_.swiper-button-next]:!bg-base-100 [&_.swiper-button-next]:!border [&_.swiper-button-next]:!border-base-300 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-next]:!shadow-md [&_.swiper-button-next]:after:!text-xs [&_.swiper-button-next]:after:!text-base-content/60 [&_.swiper-button-prev]:!w-10 [&_.swiper-button-prev]:!h-10 [&_.swiper-button-prev]:!bg-base-100 [&_.swiper-button-prev]:!border [&_.swiper-button-prev]:!border-base-300 [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!shadow-md [&_.swiper-button-prev]:after:!text-xs [&_.swiper-button-prev]:after:!text-base-content/60 [&_.swiper-button-next]:hover:!bg-primary [&_.swiper-button-next]:hover:!border-primary [&_.swiper-button-next]:hover:after:!text-white [&_.swiper-button-prev]:hover:!bg-primary [&_.swiper-button-prev]:hover:!border-primary [&_.swiper-button-prev]:hover:after:!text-white [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden lg:[&_.swiper-button-next]:!block lg:[&_.swiper-button-prev]:!block"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor._id} className="h-auto">
              <div className="group bg-base-100 border border-base-300/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20" />

                {/* Avatar area */}
                <div className="flex justify-center pt-8 pb-2">
                  <div className="relative">
                    <img
                      src={
                        doctor.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=0D8ABC&color=fff`
                      }
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-base-100 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Online dot */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full ring-2 ring-base-100" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col px-6 pb-6">
                  {/* Name & Specialization */}
                  <div className="text-center mt-3">
                    <h3 className="text-lg font-bold tracking-tight">
                      {doctor.name}
                    </h3>

                    <p className="text-primary text-sm font-medium mt-1">
                      {doctor.specialization}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="mt-5 space-y-2.5 text-sm">
                    <div className="flex items-center gap-2.5 opacity-60">
                      <HiBuildingOffice2 className="text-base shrink-0" />
                      <span className="truncate">
                        {doctor.hospital || "General Hospital"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 opacity-60">
                      <HiBriefcase className="text-base shrink-0" />
                      <span>{doctor.experience || "5 Years"}</span>
                    </div>

                    <div className="flex items-center gap-2.5 opacity-60">
                      <HiStar className="text-warning text-base shrink-0" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Bottom */}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

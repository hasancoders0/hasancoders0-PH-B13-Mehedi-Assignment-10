"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

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
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">

          <div>

            <span className="badge badge-primary badge-lg mb-4">
              Our Specialists
            </span>

            <h2 className="text-4xl font-bold">
              Meet Our Expert Doctors
            </h2>

            <p className="opacity-70 mt-4 max-w-2xl">
              Choose from experienced healthcare
              professionals dedicated to providing
              the best medical care.
            </p>

          </div>

          <Link
            href="/find-doctors"
            className="btn btn-primary"
          >
            View All Doctors

            <HiArrowRight />
          </Link>

        </div>

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="pb-14"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor._id}>
              <div className="card bg-base-100 border shadow hover:shadow-xl transition-all duration-300 h-full">

                <figure className="px-6 pt-6">

                  <img
                    src={
                      doctor.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doctor.name,
                      )}&background=0D8ABC&color=fff`
                    }
                    alt={doctor.name}
                    className="w-28 h-28 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-4"
                  />

                </figure>

                <div className="card-body">

                  <div className="text-center">

                    <h3 className="text-xl font-bold">
                      {doctor.name}
                    </h3>

                    <p className="text-primary font-medium">
                      {doctor.specialization}
                    </p>

                  </div>

                  <div className="divider my-2"></div>

                  <div className="space-y-3 text-sm">

                    <div className="flex items-center gap-2">
                      <HiBuildingOffice2 className="text-primary text-lg" />

                      <span>
                        {doctor.hospital ||
                          "General Hospital"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <HiBriefcase className="text-primary text-lg" />

                      <span>
                        {doctor.experience ||
                          "5 Years"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <HiStar className="text-warning text-lg" />

                      <span>
                        4.9 Rating
                      </span>
                    </div>

                  </div>

                  <div className="divider my-2"></div>

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs opacity-70">
                        Consultation Fee
                      </p>

                      <h4 className="text-xl font-bold text-primary">
                        ৳
                        {doctor.consultationFee}
                      </h4>

                    </div>

                    <Link
                      href={`/doctors/${doctor._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Profile
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
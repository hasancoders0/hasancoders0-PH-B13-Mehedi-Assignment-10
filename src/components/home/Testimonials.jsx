"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { HiStar, HiChatBubbleBottomCenterText } from "react-icons/hi2";

const testimonials = [
  {
    name: "Sarah Ahmed",
    image: "https://i.pravatar.cc/200?img=12",
    review:
      "Booking my appointment was incredibly easy. The doctor was professional and the entire process was smooth from booking to prescription.",
    rating: 5,
  },
  {
    name: "Mahmud Hasan",
    image: "https://i.pravatar.cc/200?img=15",
    review:
      "Excellent healthcare platform. Online payment, appointment reminders and prescription download worked perfectly.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/200?img=20",
    review:
      "I found a specialist doctor within minutes. The consultation experience exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Rakib Hossain",
    image: "https://i.pravatar.cc/200?img=32",
    review:
      "Very modern system. Everything from appointment booking to reviews is well organized.",
    rating: 5,
  },
  {
    name: "Farzana Akter",
    image: "https://i.pravatar.cc/200?img=28",
    review:
      "Highly recommend MediCare. Secure payment and friendly doctors made the whole experience stress-free.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 bg-base-200 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <HiChatBubbleBottomCenterText className="text-sm" />
            Testimonials
          </span>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            What Our Patients
            <br />
            <span className="text-base-content/40">Say About Us</span>
          </h2>

          <p className="mt-6 text-base opacity-50 leading-8 font-light max-w-lg mx-auto">
            Thousands of patients trust MediCare for quality healthcare and a
            seamless booking experience.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="pb-16 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:bg-base-300 [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-button-next]:!w-10 [&_.swiper-button-next]:!h-10 [&_.swiper-button-next]:!bg-base-100 [&_.swiper-button-next]:!border [&_.swiper-button-next]:!border-base-300 [&_.swiper-button-next]:!rounded-full [&_.swiper-button-next]:!shadow-md [&_.swiper-button-next]:after:!text-xs [&_.swiper-button-next]:after:!text-base-content/60 [&_.swiper-button-prev]:!w-10 [&_.swiper-button-prev]:!h-10 [&_.swiper-button-prev]:!bg-base-100 [&_.swiper-button-prev]:!border [&_.swiper-button-prev]:!border-base-300 [&_.swiper-button-prev]:!rounded-full [&_.swiper-button-prev]:!shadow-md [&_.swiper-button-prev]:after:!text-xs [&_.swiper-button-prev]:after:!text-base-content/60 [&_.swiper-button-next]:hover:!bg-primary [&_.swiper-button-next]:hover:!border-primary [&_.swiper-button-next]:hover:after:!text-white [&_.swiper-button-prev]:hover:!bg-primary [&_.swiper-button-prev]:hover:!border-primary [&_.swiper-button-prev]:hover:after:!text-white [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden lg:[&_.swiper-button-next]:!block lg:[&_.swiper-button-prev]:!block"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="group bg-base-100 border border-base-300/60 rounded-3xl p-7 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-base-300/40 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                {/* Decorative quote */}
                <span className="absolute top-4 right-6 text-7xl font-serif text-primary/[0.06] leading-none select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 text-warning mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <HiStar key={i} className="text-lg" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm opacity-60 leading-7 font-light flex-1 relative z-10">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3.5 mt-6 pt-6 border-t border-base-300/50">
                  <div className="avatar">
                    <div className="w-11 h-11 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-tight leading-none">
                      {item.name}
                    </h3>
                    <p className="text-[11px] opacity-40 mt-1 font-light">
                      Verified Patient
                    </p>
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

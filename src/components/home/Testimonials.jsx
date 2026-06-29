"use client";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { HiStar } from "react-icons/hi2";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      image:
        "https://i.pravatar.cc/200?img=12",
      review:
        "Booking my appointment was incredibly easy. The doctor was professional and the entire process was smooth from booking to prescription.",
      rating: 5,
    },
    {
      name: "Mahmud Hasan",
      image:
        "https://i.pravatar.cc/200?img=15",
      review:
        "Excellent healthcare platform. Online payment, appointment reminders and prescription download worked perfectly.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      image:
        "https://i.pravatar.cc/200?img=20",
      review:
        "I found a specialist doctor within minutes. The consultation experience exceeded my expectations.",
      rating: 5,
    },
    {
      name: "Rakib Hossain",
      image:
        "https://i.pravatar.cc/200?img=32",
      review:
        "Very modern system. Everything from appointment booking to reviews is well organized.",
      rating: 5,
    },
    {
      name: "Farzana Akter",
      image:
        "https://i.pravatar.cc/200?img=28",
      review:
        "Highly recommend MediCare. Secure payment and friendly doctors made the whole experience stress-free.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-14">

          <span className="badge badge-primary badge-lg mb-4">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold">
            What Our Patients Say
          </h2>

          <p className="mt-5 opacity-70">
            Thousands of patients trust MediCare for
            quality healthcare and a seamless booking
            experience.
          </p>

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
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {testimonials.map(
            (item, index) => (
              <SwiperSlide key={index}>
                <div className="card bg-base-100 border shadow hover:shadow-xl transition-all duration-300 h-full">

                  <div className="card-body">

                    <div className="flex items-center gap-4">

                      <div className="avatar">

                        <div className="w-16 rounded-full ring ring-primary ring-offset-2">

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                        </div>

                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.name}
                        </h3>

                        <div className="flex text-warning mt-1">

                          {[...Array(item.rating)].map(
                            (_, i) => (
                              <HiStar
                                key={i}
                                className="text-lg"
                              />
                            ),
                          )}

                        </div>

                      </div>

                    </div>

                    <div className="divider"></div>

                    <p className="opacity-80 leading-7 italic">
                      "{item.review}"
                    </p>

                  </div>

                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>

      </div>
    </section>
  );
}
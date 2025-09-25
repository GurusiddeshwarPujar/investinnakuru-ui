"use client";

import Image from "next/image";
import Link from "next/link";
import SwiperInit from "../header/SwiperInit";
import { useEffect, useState } from "react";

export default function SuccessStories() {

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/testimonials/list`);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials.");
        }
        const data = await response.json();
        const featuredTestimonials = data.filter(
          (testimonial) => testimonial.Featured === true
        );
        setTestimonials(featuredTestimonials);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="md:py-[90px] py-[60px] bg-gray text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:py-[90px] py-[60px] bg-gray text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  // This part of the code checks if the testimonials array is empty.
  if (testimonials.length === 0) {
    return null; 
  }

  return (
    <div className="md:py-[90px] py-[60px] bg-gray">
      <div className="container">
        <h2 className="mb-7 text-center">Success Stories</h2>
        <div className="success-stories-slider swiper">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div className="swiper-slide" key={testimonial.TID}>
                <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                  <div className="flex-auto shrink-0 grow-0 w-[30%]">
                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                      <Image
                        src={`${baseUrl}/images/testimonial/${testimonial.Image}`}
                        alt={testimonial.TFullName}
                        width={170}
                        height={170}
                        className="w-[100%] h-[100%] object-cover absolute top-0 left-0"
                      />
                    </div>
                  </div>
                  <div className="flex-auto grow">
                    <div className="description">
                      <p>“{testimonial.testimonial}”</p>
                    </div>
                    <p className="font-bold text-[20px] mb-1">
                      {testimonial.TFullName}
                    </p>
                    <p className="mb-0">{testimonial.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
      <SwiperInit />
    </div>
  );
}
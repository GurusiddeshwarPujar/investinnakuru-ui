"use client";

import { useState } from "react";
import Image from "next/image";
import { Testimonial } from "@/app/(public-site)/success-stories/page";

type Props = {
  testimonials: Testimonial[];
};

const ITEMS_PER_PAGE = 12;

export default function TestimonialsList({ testimonials }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleTestimonials = testimonials.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.length > 0 ? (
          visibleTestimonials.map((t) => (
            <div
              key={t.TID}
              className="p-6 border rounded-xl shadow-md bg-white flex flex-col items-center text-center transition hover:shadow-lg"
            >
              {/* Profile Image */}
              <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={t.imageUrl}
                  alt={t.TFullName}
                  fill
                  className="object-cover rounded-full"
                  sizes="100px"
                />
              </div>

              {/* Testimonial Text */}
              <blockquote className="italic text-gray-700">
                “{t.testimonial}”
              </blockquote>

              {/* Author Info */}
              <p className="font-semibold text-lg mt-4">{t.TFullName}</p>
              <p className="text-sm text-gray-500">{t.designation}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            <p>No success stories found at the moment. Please check back later!</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < testimonials.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

import React from "react";
import FooterInfo from "@/components/home/footerInfo";
import TestimonialsList from "@/components/successStories/TestimonialsList";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// API response shape
type ApiTestimonial = {
  TID: string;
  TFullName: string;
  designation: string;
  testimonial: string;
  Image: string;
};

// Final mapped type (includes imageUrl)
export type Testimonial = ApiTestimonial & {
  imageUrl: string;
};

//Fetch testimonials with safe typing
async function fetchTestimonials(): Promise<Testimonial[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const url = `${baseUrl}/api/testimonials/list`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 404) redirect("/error-404"); 
    if (res.status >= 500) redirect("/error-505");

    if (!res.ok) {
      console.error(`Failed to fetch testimonials. Status: ${res.status}`);
      return [];
    }

    const data: ApiTestimonial[] = await res.json();

    return data.map((t) => ({
      ...t,
      imageUrl: `${baseUrl}/images/testimonial/${t.Image}`,
    }));
  } catch (error) {
    console.error("Testimonial Fetch Error:", error);
    return [];
  }
}

// Page Component
export default async function SuccessStoriesPage() {
  const testimonials = await fetchTestimonials();

  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Read inspiring stories from investors who have partnered with Nakuru County.
          </p>
        </div>
      </section>
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <TestimonialsList testimonials={testimonials} />
        </div>
      </section>
      <FooterInfo />
    </>
  );
}

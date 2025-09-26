// /app/admin/testimonials/page.jsx
import React from "react";
import TestimonialManager from "@/components/testimonials/TestimonialManager";

export const metadata = {
  title: "Success Stories Manager | Invest In Nakuru",
  description: "Admin can create, edit, and manage success stories.",
};

const TestimonialsPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Success Stories
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Create and manage user success stories.
          </p>
        </div>
      </div>
      <TestimonialManager />
    </>
  );
};

export default TestimonialsPage;
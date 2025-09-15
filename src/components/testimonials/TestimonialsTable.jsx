
'use client';

import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";

export default function TestimonialsTable({
  testimonials,
  onEditClick,
  onTestimonialDeleted,
  onFeaturedToggled,
  onError,
  handleAuthError,
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const { authToken } = parseCookies();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleDelete = async (testimonialId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const res = await fetch(`${backendUrl}/api/testimonials/${testimonialId}`, {
          method: "DELETE",
          headers: { "x-auth-token": authToken || "" },
        });

        if (!res.ok) {
          if (res.status === 401) {
            handleAuthError();
            return;
          }
          throw new Error(`Failed to delete testimonial: Server responded with ${res.status}`);
        }
        onTestimonialDeleted();
      } catch (err) {
        onError(err.message);
      }
    }
  };


    const handleToggleFeatured = async (tid) => {
    try {
      const res = await fetch(`${backendUrl}/api/testimonials/toggle-featured/${tid}`, {
        method: "PUT",
        headers: { "x-auth-token": authToken || "" },
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleAuthError();
          return;
        }
        const errData = await res.json();
        throw new Error(errData.msg || "Failed to toggle featured status.");
      }
      onFeaturedToggled();
    } catch (err) {
      onError(err.message);
    }
  };

  const filteredTestimonials = testimonials.filter((t) =>
    [t.TFullName, t.designation].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTestimonials = filteredTestimonials.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTestimonials.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage, testimonials]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">List of Testimonials</h2>
   
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border px-3 py-2 rounded-lg"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Featured</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTestimonials.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No testimonials found
                </td>
              </tr>
            ) : (
              currentTestimonials.map((testimonial) => (
                <tr key={testimonial.TID} className="border-b">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                      {testimonial.Image && (
                        <img
                          src={`${backendUrl}/images/testimonial/${testimonial.Image}`}
                          alt={testimonial.TFullName}
                          className="object-cover rounded-full w-16 h-16"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{testimonial.TFullName}</td>
                  <td className="px-4 py-3">{testimonial.designation}</td>
                  <td className="px-4 py-3">
                    {new Date(testimonial.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(/ /g, "/")}
                  </td>
                  <td className="px-6 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={testimonial.Featured}
                        onChange={() => handleToggleFeatured(testimonial.TID)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEditClick(testimonial)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.TID)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredTestimonials.length)} of {filteredTestimonials.length}
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>


       {selectedTestimonial && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 overflow-y-auto">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Testimonial Details</h3>
      </div>
      

      <div className="border rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-[50vh] overflow-y-auto">

        {selectedTestimonial.Image && (
                <div className="p-4 text-center">
                  <img
                    src={`${backendUrl}/images/testimonial/${selectedTestimonial.Image}`}
                    alt={selectedTestimonial.TFullName}
                    className="inline-block w-32 h-32 rounded-full shadow-md object-cover"
                  />
                </div>
              )}
      

        <div className="p-4">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Full Name:</span>
            <span className="text-gray-900 dark:text-white text-right">{selectedTestimonial.TFullName}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Designation:</span>
            {selectedTestimonial.designation}
          </div>
          
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Created At:</span>
            <span className="text-gray-900 dark:text-white text-right">{new Date(selectedTestimonial.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).replace(/ /g, "/")}</span>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
            <span className="text-gray-900 dark:text-white text-right">{new Date(selectedTestimonial.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).replace(/ /g, "/")}</span>
          </div>
        </div>

         <div className="px-4 py-2">
          <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Testimonial:</span>
          <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: selectedTestimonial.testimonial }} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setSelectedTestimonial(null)}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
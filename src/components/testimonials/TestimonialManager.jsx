// /components/testimonials/TestimonialManager.jsx
'use client';

import React, { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import AddTestimonialForm from "./AddTestimonialForm";
import TestimonialsTable from "./TestimonialsTable";
import Button from "../ui/button/Button"; 

export default function TestimonialManager() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
  const router = useRouter();

  const [testimonials, setTestimonials] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [view, setView] = useState('list'); 
  const { authToken } = parseCookies();

  const handleAuthError = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "isAdmin");
    router.push("/admin/login");
  };

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/testimonials`, {
        headers: { "x-auth-token": authToken || "" },
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch testimonials.");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAddClick = () => {
    setEditingTestimonial(null);
    setView('form');
  };

  const handleEditClick = (testimonial) => {
    setEditingTestimonial(testimonial);
    setView('form');
  };

  const handleBackToList = () => {
    fetchTestimonials();
    setView('list');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md">
      {status && (
        <div
          className={`p-3 mb-4 text-sm rounded-lg ${
            status.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </div>
      )}

      {view === 'list' ? (
        <>
          <div className="flex justify-end mb-4">
            <Button onClick={handleAddClick}>Add Testimonial</Button>
          </div>
          <TestimonialsTable
            testimonials={testimonials}
            onEditClick={handleEditClick}
            onTestimonialDeleted={() => {
              setStatus("Testimonial deleted successfully!");
              fetchTestimonials();
            }}
            onFeaturedToggled={() => {
              setStatus("Testimonial featured status updated successfully!");
              fetchTestimonials();
            }}
            onError={(message) => setStatus(message)}
            handleAuthError={handleAuthError}
          />
        </>
      ) : (
        <AddTestimonialForm
          backendUrl={backendUrl}
          authToken={authToken}
          editingTestimonial={editingTestimonial}
          setEditingTestimonial={setEditingTestimonial}
          onTestimonialAdded={() => {
            setStatus("Testimonial added successfully!");
            handleBackToList();
          }}
          onTestimonialUpdated={() => {
            setStatus("Testimonial updated successfully!");
            handleBackToList();
          }}
          onError={(message) => setStatus(message)}
          handleAuthError={handleAuthError}
          onCancel={handleBackToList}
        />
      )}
    </div>
  );
}
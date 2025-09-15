
'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/button/Button";

export default function AddTestimonialForm({
  backendUrl,
  authToken,
  editingTestimonial,
  setEditingTestimonial,
  onTestimonialAdded,
  onTestimonialUpdated,
  onError,
  handleAuthError,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    defaultValues: {
      TFullName: "",
      designation: "",
      testimonial: "",
      Image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const imageFile = watch("Image");

  useEffect(() => {
    if (editingTestimonial) {
      reset({
        TFullName: editingTestimonial.TFullName,
        designation: editingTestimonial.designation,
        testimonial: editingTestimonial.testimonial,
        Image: null,
      });
      setImagePreview(editingTestimonial.Image ? `${backendUrl}/images/testimonial/${editingTestimonial.Image}` : null);
    } else {
      reset();
      setImagePreview(null);
    }
  }, [editingTestimonial, reset, backendUrl]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "Image" && data[key] && data[key][0]) {
        formData.append(key, data[key][0]);
      } else if (key !== "Image") {
        formData.append(key, data[key]);
      }
    }

    try {
      const url = editingTestimonial
        ? `${backendUrl}/api/testimonials/${editingTestimonial.TID}`
        : `${backendUrl}/api/testimonials`;
      const method = editingTestimonial ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "x-auth-token": authToken || "" },
        body: formData,
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.msg || `Error during ${editingTestimonial ? "update" : "creation"}.`);
      }

      editingTestimonial ? onTestimonialUpdated() : onTestimonialAdded();
      reset();
      setEditingTestimonial(null);
      setImagePreview(null);
    } catch (err) {
      onError(err.message);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {editingTestimonial ? "Update Testimonial" : "Add New Testimonial"}
      </h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-4"
        encType="multipart/form-data"
      >
       
        <div>
          <label htmlFor="tFullName" className="block mb-2 text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="tFullName"
            {...register("TFullName", { required: "Please enter the full name." })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {errors.TFullName && <p className="mt-2 text-sm text-red-600">{errors.TFullName.message}</p>}
        </div>

        
        <div>
          <label htmlFor="designation" className="block mb-2 text-sm font-medium">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            {...register("designation", { required: "Please enter the designation." })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {errors.designation && <p className="mt-2 text-sm text-red-600">{errors.designation.message}</p>}
        </div>

    
        <div>
          <label htmlFor="testimonial" className="block mb-2 text-sm font-medium">
            Testimonial
          </label>
          <textarea
            id="testimonial"
            rows={6}
            {...register("testimonial", {
              required: "Please enter the testimonial content.",
              minLength: {
                value: 20,
                message: "Testimonial must be at least 20 characters long.",
              },
            })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {errors.testimonial && (
            <p className="mt-2 text-sm text-red-600">
              {errors.testimonial.message}
            </p>
          )}
        </div>

    
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium">
            Testimonial Image
          </label>
          <input
            type="file"
            id="image"
            {...register("Image", {
              required: !editingTestimonial && "Please upload an image.",
              validate: (fileList) => {
                if (fileList?.length > 0) {
                  const file = fileList[0];
                  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
                  if (!allowedTypes.includes(file.type)) {
                    return "Invalid file type. Only JPG, PNG, JPEG, and WEBP allowed.";
                  }
                }
                return true;
              },
            })}
            accept=".jpeg, .png, .jpg, .webp"
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {errors.Image && <p className="mt-2 text-sm text-red-600">{errors.Image.message}</p>}
          {imagePreview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 max-w-full h-auto rounded-lg shadow-md"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}
        </div>

    
        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Processing..." : editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
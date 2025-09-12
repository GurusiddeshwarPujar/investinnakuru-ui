'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddBannerForm({
  backendUrl,
  authToken,
  editingBanner,
  setEditingBanner,
  onBannerAdded,
  onBannerUpdated,
  onError,
  handleAuthError,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      BannerTitle: "",
      BannerImage: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const imageFile = watch("BannerImage");

 
  useEffect(() => {
    if (editingBanner) {
      reset({  BannerTitle: editingBanner.BannerTitle || "", BannerImage: null });
      setImagePreview(
        editingBanner.BannerImage
          ? `${backendUrl}/images/banners/${editingBanner.BannerImage}`
          : null
      );
    } else {
      reset();
      setImagePreview(null);
    }
  }, [editingBanner, reset, backendUrl, setValue]);


  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    if (data.BannerTitle) {
      formData.append("BannerTitle", data.BannerTitle);
    }

   
    if (data.BannerImage && data.BannerImage[0]) {
      formData.append("BannerImage", data.BannerImage[0]);
    }

    try {
      const url = editingBanner
        ? `${backendUrl}/api/admin/banners/${editingBanner.BannerID}`
        : `${backendUrl}/api/admin/banners`;
      const method = editingBanner ? "PUT" : "POST";

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
        throw new Error(
          resData.msg ||
            `Error during ${editingBanner ? "update" : "creation"}.`
        );
      }

      editingBanner ? onBannerUpdated() : onBannerAdded();
      reset();
      setEditingBanner(null);
      setImagePreview(null);
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {editingBanner ? "Update Banner" : "Add New Banner"}
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-4"
        encType="multipart/form-data"
      >

        <div>
          <label htmlFor="bannerTitle" className="block mb-2 text-sm font-medium">
            Banner Title (Optional)
          </label>
          <input
            type="text"
            id="bannerTitle"
            {...register("BannerTitle")}
            placeholder="Enter banner title"
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
        </div>
       
        <div>
          <label htmlFor="bannerImage" className="block mb-2 text-sm font-medium">
            Banner Image
          </label>
          <input
            type="file"
            id="bannerImage"
            {...register("BannerImage", {
              required: !editingBanner && "Please upload a banner image.",
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
          {errors.BannerImage && (
            <p className="mt-2 text-sm text-red-600">{errors.BannerImage.message}</p>
          )}

          {imagePreview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <img
                src={imagePreview}
                alt="Banner Preview"
                className="mt-2 max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

     
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isSubmitting ? "Processing..." : editingBanner ? "Update Banner" : "Add Banner"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="mt-2 px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

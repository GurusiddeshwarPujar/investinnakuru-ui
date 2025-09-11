'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const generateUrlSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") 
    .replace(/[^\w-]+/g, "") 
    .replace(/--+/g, "-"); 
};

export default function AddCategoryForm({
  backendUrl,
  authToken,
  editingCategory,
  setEditingCategory,
  onCategoryAdded,
  onCategoryUpdated,
  onError,
  handleAuthError,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { catName: "", Image: null },
  });

  const [imagePreview, setImagePreview] = useState(null);


  const imageFile = watch("Image");

  
  useEffect(() => {
    if (editingCategory) {
      reset({ catName: editingCategory.CatName, Image: null });
      setImagePreview(
        editingCategory.Image
          ? `${backendUrl}/images/keysector/${editingCategory.Image}`
          : null
      );
    } else {
      reset({ catName: "", Image: null });
      setImagePreview(null);
    }
  }, [editingCategory, reset, backendUrl]);

 
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

 
  const handleFormSubmit = async (data) => {
    try {
      const url = editingCategory
        ? `${backendUrl}/api/cat/${editingCategory.CatId}`
        : `${backendUrl}/api/cat`;
      const method = editingCategory ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("CatName", data.catName);
      formData.append("CatURL", generateUrlSlug(data.catName));
      if (data.Image && data.Image[0]) {
        formData.append("Image", data.Image[0]);
      }

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
            `An unexpected error occurred during ${
              editingCategory ? "update" : "creation"
            }.`
        );
      }

      if (editingCategory) {
        onCategoryUpdated();
      } else {
        onCategoryAdded();
      }

      reset();
      setEditingCategory(null);
      setImagePreview(null);
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {editingCategory ? "Update Key Sector" : "Add New Key Sector"}
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-4"
        encType="multipart/form-data"
      >
        
        <div>
          <label
            htmlFor="catName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Key Sector Name
          </label>
          <input
            type="text"
            id="catName"
            {...register("catName", {
              required: "Please enter key sector name.",
              minLength: {
                value: 3,
                message: "Key Sector Name must be at least 3 characters long.",
              },
              maxLength: {
                value: 50,
                message: "Key Sector Name cannot exceed 50 characters.",
              },
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          {errors.catName && (
            <p className="mt-2 text-sm text-red-600">{errors.catName.message}</p>
          )}
        </div>

       
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("Image", {
              required: !editingCategory && "Please upload Image.",
              validate: (fileList) => {
                if (fileList?.length > 0) {
                  const file = fileList[0];
                  const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ];
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
          {errors.Image && (
            <p className="mt-2 text-sm text-red-600">{errors.Image.message}</p>
          )}
          {imagePreview && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

     
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto
            bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500
            disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Processing..."
              : editingCategory
              ? "Update Key Sector"
              : "Add Key Sector"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

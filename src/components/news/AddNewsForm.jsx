'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "primereact/editor";
import Button from "../ui/button/Button";

const generateUrlSlug = (title = "") => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const editorHeader = (
  <span className="ql-formats">
    <select className="ql-header" defaultValue="0">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="0">Normal</option>
    </select>
    <select className="ql-font" defaultValue="sans-serif">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>

    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <select className="ql-align"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-clean"></button>
  </span>
);



export default function AddNewsForm({
  backendUrl,
  authToken,
  categories,
  editingNews,
  setEditingNews,
  onNewsAdded,
  onNewsUpdated,
  onError,
  handleAuthError,
  onCancel, // New prop
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      CatId: "",
      NewsTitle: "",
      NewsShortDescription: "",
      NewsDescription: "",
      Image: null,
    },
  });

  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const newsTitle = watch("NewsTitle");
  const newsDescription = watch("NewsDescription");
  const imageFile = watch("Image");

  useEffect(() => {
    setSlug(generateUrlSlug(newsTitle));
  }, [newsTitle]);

  useEffect(() => {
    if (editingNews) {
      reset({
        CatId: editingNews.CatId,
        NewsTitle: editingNews.NewsTitle,
        NewsShortDescription: editingNews.NewsShortDescription,
        NewsDescription: editingNews.NewsDescription,
        Image: null,
      });
      setSlug(editingNews.NewsURL);
      setImagePreview(editingNews.Image ? `${backendUrl}/images/news/${editingNews.Image}` : null);
    } else {
      reset();
      setSlug("");
      setImagePreview(null);
    }
  }, [editingNews, reset, backendUrl]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("NewsURL", slug);

    for (const key in data) {
      if (key === "Image" && data[key] && data[key][0]) {
        formData.append(key, data[key][0]);
      } else if (key !== "Image") {
        formData.append(key, data[key]);
      }
    }

    try {
      const url = editingNews
        ? `${backendUrl}/api/admin/news/${editingNews.NewsId}`
        : `${backendUrl}/api/admin/news`;
      const method = editingNews ? "PUT" : "POST";

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
        throw new Error(resData.msg || `Error during ${editingNews ? "update" : "creation"}.`);
      }

      editingNews ? onNewsUpdated() : onNewsAdded();
      reset();
      setEditingNews(null);
      setSlug("");
      setImagePreview(null);
    } catch (err) {
      onError(err.message);
    }
  };

  const handleCancel = () => {
    // Call the onCancel prop from the parent
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {editingNews ? "Update News Article & Events" : "Add New News Article & Events"}
      </h2>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-4"
        encType="multipart/form-data"
      >
        {/* Category Dropdown */}
        <div>
          <label htmlFor="catId" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <select
            id="catId"
            {...register("CatId", { required: "Please select a category." })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.CatId} value={cat.CatId}>
                {cat.CatName}
              </option>
            ))}
          </select>
          {errors.CatId && <p className="mt-2 text-sm text-red-600">{errors.CatId.message}</p>}
        </div>

        {/* News Title */}
        <div>
          <label htmlFor="newsTitle" className="block mb-2 text-sm font-medium">
            News Title
          </label>
          <input
            type="text"
            id="newsTitle"
            {...register("NewsTitle", { required: "Please enter news title." })}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {errors.NewsTitle && <p className="mt-2 text-sm text-red-600">{errors.NewsTitle.message}</p>}
        </div>

        {/* News URL */}
        <div>
          <label htmlFor="newsUrl" className="block mb-2 text-sm font-medium">
            News URL
          </label>
          <input
            type="text"
            id="newsUrl"
            value={slug}
            readOnly
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Short Description */}
      <div>
        <label
          htmlFor="newsShortDescription"
          className="block mb-2 text-sm font-medium"
        >
          Short Description
        </label>
        <textarea
          id="newsShortDescription"
          rows={3}
          {...register("NewsShortDescription", {
            required: "Please enter a short description.",
            validate: (value) =>
              value.trim().length >= 10 ||
              "Short description must be at least 10 characters long.",
          })}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
        />
        {errors.NewsShortDescription && (
          <p className="mt-2 text-sm text-red-600">
            {errors.NewsShortDescription.message}
          </p>
        )}
      </div>



        {/* Description */}
        <div>
          <label htmlFor="newsDescription" className="block mb-2 text-sm font-medium">
            Description
          </label>
          <Editor
            headerTemplate={editorHeader}
            value={newsDescription}
            onTextChange={(e) =>
              reset({ ...watch(), NewsDescription: e.htmlValue })
            }
            style={{ height: "320px" }}
              
          />
          <input
            type="hidden"
            {...register("NewsDescription", {
              required: "Please enter description.",
              validate: (value) => {
                const plainText = value.replace(/<[^>]*>/g, "").trim();
                return (
                  plainText.length >= 20 || "Description must be at least 20 characters long."
                );
              },
            })}
          />
          {errors.NewsDescription && (
            <p className="mt-2 text-sm text-red-600">{errors.NewsDescription.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("Image", {
              required: !editingNews && "Please upload Image.",
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
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Processing..." : editingNews ? "Update News & Events" : "Add News & Events"}
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
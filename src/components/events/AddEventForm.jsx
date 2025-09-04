'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "primereact/editor";
import Button from "../ui/button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const generateUrlSlug = (title = "") => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export default function AddEventForm({
  backendUrl,
  authToken,
  editingEvent,
  setEditingEvent,
  onEventAdded,
  onEventUpdated,
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
      EventTitle: "",
      Description: "",
      EventDate: null,
    },
  });

  const [slug, setSlug] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const eventTitle = watch("EventTitle");
  const description = watch("Description");

  useEffect(() => {
    setSlug(generateUrlSlug(eventTitle));
  }, [eventTitle]);

  useEffect(() => {
    if (editingEvent) {
      const eventDate = new Date(editingEvent.EventDate);
      reset({
        EventTitle: editingEvent.EventTitle,
        Description: editingEvent.Description,
      });
      setSelectedDate(eventDate);
      setValue("EventDate", eventDate, { shouldValidate: true });
      setSlug(editingEvent.EventURL);
    } else {
      reset();
      setSelectedDate(null);
      setSlug("");
    }
  }, [editingEvent, reset, setValue]);

  const handleFormSubmit = async (data) => {
    const payload = {
      ...data,
      EventURL: slug,
      EventDate: selectedDate ? selectedDate.toISOString() : null,
    };

    try {
      const url = editingEvent
        ? `${backendUrl}/api/events/${editingEvent.EventID}`
        : `${backendUrl}/api/events`;
      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.msg || `Error during ${editingEvent ? "update" : "creation"}.`);
      }

      editingEvent ? onEventUpdated() : onEventAdded();
      reset();
      setSelectedDate(null);
      setEditingEvent(null);
      setSlug("");
    } catch (err) {
      onError(err.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("EventDate", date, { shouldValidate: true });
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        {editingEvent ? "Update Event" : "Add New Event"}
      </h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-4"
      >
      
        <div className="flex flex-wrap -mx-2">
          
          <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
            <label htmlFor="EventTitle" className="block mb-2 text-sm font-medium">
              Event Title
            </label>
            <input
              type="text"
              id="EventTitle"
              {...register("EventTitle", { required: "Please enter event title." })}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            />
            {errors.EventTitle && <p className="mt-2 text-sm text-red-600">{errors.EventTitle.message}</p>}
          </div>

          
          <div className="w-full md:w-1/3 px-2">
            <label htmlFor="EventDate" className="block mb-2 text-sm font-medium">
              Event Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm cursor-pointer"
              placeholderText="Select a date"
            />
            <input
              type="hidden"
              {...register("EventDate", {
                required: "Please select an event date.",
              })}
            />
            {errors.EventDate && <p className="mt-2 text-sm text-red-600">{errors.EventDate.message}</p>}
          </div>
        </div>

       
        <div>
          <label htmlFor="Description" className="block mb-2 text-sm font-medium">
            Description
          </label>
            <Editor
            value={description}
            onTextChange={(e) => reset({ ...watch(), Description: e.htmlValue })}
            style={{ height: "320px" }}
          />
          <input
            type="hidden"
            {...register("Description", {
              required: "Please enter description.",
              validate: (value) => {
                const plainText = value.replace(/<[^>]*>/g, "").trim();
                return (
                  plainText.length >= 20 || "Description must be at least 20 characters long."
                );
              },
            })}
          />
          {errors.Description && (
            <p className="mt-2 text-sm text-red-600">{errors.Description.message}</p>
          )}
        </div>

        
        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Processing..." : editingEvent ? "Update Event" : "Add Event"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
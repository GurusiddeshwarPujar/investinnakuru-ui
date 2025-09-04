'use client';

import React, { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import AddEventForm from "./AddEventForm";
import EventsTable from "./EventsTable";
import Button from "../ui/button/Button";

export default function EventsManager() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [view, setView] = useState('list');
  const { authToken } = parseCookies();

  const handleAuthError = () => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "isAdmin");
    router.push("/admin/login");
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/events`, {
        headers: { "x-auth-token": authToken || "" },
      });
      if (res.status === 401) {
        handleAuthError();
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch events.");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleAddClick = () => {
    setEditingEvent(null);
    setView('form');
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setView('form');
  };

  const handleBackToList = () => {
    fetchEvents();
    setView('list');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading events...</p>
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
            <Button onClick={handleAddClick}>Add New Event</Button>
          </div>
          <EventsTable
            events={events}
            onEditClick={handleEditClick}
            onEventDeleted={() => {
              setStatus("Event deleted successfully!");
              fetchEvents();
            }}
            onFeaturedToggled={() => {
              setStatus("Event featured status updated successfully!");
              fetchEvents();
            }}
            onError={(message) => setStatus(message)}
            handleAuthError={handleAuthError}
          />
        </>
      ) : (
        <AddEventForm
          backendUrl={backendUrl}
          authToken={authToken}
          editingEvent={editingEvent}
          setEditingEvent={setEditingEvent}
          onEventAdded={() => {
            setStatus("Event added successfully!");
            handleBackToList();
          }}
          onEventUpdated={() => {
            setStatus("Event updated successfully!");
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
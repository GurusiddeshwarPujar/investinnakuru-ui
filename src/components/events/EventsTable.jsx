'use client';

import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";

export default function EventsTable({
  events,
  onEditClick,
  onEventDeleted,
  onFeaturedToggled,
  onError,
  handleAuthError,
}) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const { authToken } = parseCookies();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/events/${eventToDelete}`, {
        method: "DELETE",
        headers: { "x-auth-token": authToken || "" },
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleAuthError();
          return;
        }
        throw new Error(
          `Failed to delete event: Server responded with ${res.status}`
        );
      }
      onEventDeleted();
      setShowConfirmModal(false);
    } catch (err) {
      onError(err.message);
    }
  };

  const handleToggleFeatured = async (eventId) => {
    try {
      const res = await fetch(`${backendUrl}/api/events/toggle-featured/${eventId}`, {
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

  const filteredEvents = events.filter((e) =>
    [e.EventTitle, e.EventURL].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage, events]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">List of Events</h2>
      {/* Filter and Pagination Controls */}
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
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full md:w-1/3"
        />
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Event Title</th>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">Event Date</th>
              <th className="px-6 py-3">Featured</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No events found
                </td>
              </tr>
            ) : (
              currentEvents.map((event) => (
                <tr key={event.EventID} className="border-b">
                  <td className="px-6 py-3">{event.EventTitle}</td>
                  <td className="px-6 py-3">{event.EventURL}</td>
                  <td className="px-6 py-3">
                    {new Date(event.EventDate).toLocaleDateString("en-GB", {
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
                        checked={event.Featured}
                        onChange={() => handleToggleFeatured(event.EventID)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform"></div>
                    </label>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEditClick(event)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.EventID)}
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

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredEvents.length)} of{" "}
          {filteredEvents.length}
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
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Event Details Modal (Popup) */}
      {selectedEvent && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Event Details</h3>
            </div>
            
            <div className="border rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-[50vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Title:</span>
                  <span className="text-gray-900 dark:text-white text-right">{selectedEvent.EventTitle}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">URL:</span>
                  <span className="text-gray-900 dark:text-white text-right">{selectedEvent.EventURL}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Location:</span>
                  <span className="text-gray-900 dark:text-white text-right">{selectedEvent.Location}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Event Start Date:</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {new Date(selectedEvent.EventDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(/ /g, "/")}
                  </span>
                </div>
                {selectedEvent.EventEndDate && (
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Event End Date:</span>
                    <span className="text-gray-900 dark:text-white text-right">
                      {new Date(selectedEvent.EventEndDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).replace(/ /g, "/")}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Featured:</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {selectedEvent.Featured ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Created At:</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {new Date(selectedEvent.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(/ /g, "/")}
                  </span>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated At:</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {new Date(selectedEvent.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).replace(/ /g, "/")}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2">
                <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Description:</span>
                <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: selectedEvent.Description }} />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete this event?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

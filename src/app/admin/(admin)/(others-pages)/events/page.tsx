import React from "react";
import EventsManager from "@/components/events/EventsManager";

export const metadata = {
  title: "Manage Events | Invest In Nakuru",
  description: "Admin can create, edit, and manage events.",
};

const EventsPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Events
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Create and manage events.
          </p>
        </div>
      </div>

      {/* News Manager UI */}
      <EventsManager />
    </>
  );
};

export default EventsPage;
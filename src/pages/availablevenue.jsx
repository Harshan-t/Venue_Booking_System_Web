import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [products, setProducts] = useState([]);

  const setVenueDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8000/venues");
      if (response.data && Array.isArray(response.data.venues)) {
        setProducts(response.data.venues);
      } else {
        throw new Error("Invalid venue data");
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to load venues. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/calander");
      if (response.data && Array.isArray(response.data)) {
        const approvedBookings = response.data;

        const calendarEvents = approvedBookings.map((booking) => ({
          staff: booking.staff,
          email: booking.email,
          title: booking.Venue_Name,
          start: `${booking.Booking_Date.slice(0, 10)}T${booking.From_Time}`,
          end: `${booking.Booking_Date.slice(0, 10)}T${booking.To_Time}`,
          description: booking.Description,
          backgroundColor: "#4caf50",
          borderColor: "#388e3c",
          textColor: "#fff",
        }));

        setEvents(calendarEvents);
      } else {
        console.warn("No bookings found in response.");
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    setVenueDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading bookings: {error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full  bg-gray-100">
      <div className="m-3 max-h-[1385px] md:w-1/4 bg-white shadow-lg p-6 space-y-6 rounded-lg">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
        <ul className="space-y-6">
          {events.map((event, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl cursor-pointer transition duration-300 transform hover:scale-105"
              onClick={() => setSelectedEvent(event)}
            >
              <h3 className="font-semibold text-lg text-indigo-600">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(event.start).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Staff: {event.staff}
              </p>
              <p className="text-sm text-gray-500">
                Email: {event.email}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-3 p-6 overflow-auto rounded-2xl bg-white shadow-xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventColor="#007bff"
          eventTextColor="#fff"
          eventBorderColor="#0056b3"
          height="auto"
          eventClick={(info) => setSelectedEvent(info.event)}
          eventClassNames="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          dayHeaderClassNames="bg-indigo-600 text-white font-bold"
          dayClassNames="hover:bg-indigo-100 transition-all duration-200 ease-in-out cursor-pointer"
          headerClassNames="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold"
        />
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold text-indigo-600">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(selectedEvent.start).toLocaleString()} - {new Date(selectedEvent.end).toLocaleString()}
            </p>
            <p className="mt-4">{selectedEvent.extendedProps.description || "No description available"}</p>
            <p className="mt-2 text-sm text-gray-500">
              Staff: {selectedEvent.extendedProps.staff}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Email: {selectedEvent.extendedProps.email}
            </p>
            <button
              className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-600 transition-colors duration-300"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;


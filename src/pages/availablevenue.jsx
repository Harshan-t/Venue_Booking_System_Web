import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../styles/Calendar.css";

import { UserContext } from '../../UserContext.jsx';
import Navbar from '../components/Navbar';
import Header from '../components/header.jsx';

function CalendarPage() {
  const [events, setEvents] = useState([]); // All events
  const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [products, setProducts] = useState([]); // Venues
  const { userData } = useContext(UserContext);

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
        console.log(approvedBookings.map((booking) => booking.Booking_Date.slice(0, 8) + (parseInt(booking.Booking_Date.slice(8, 10)) + 1)));


        const calendarEvents = approvedBookings.map((booking) => ({
          staff: booking.staff,
          email: booking.email,
          title: booking.Venue_Name,
          start: `${booking.Booking_Date.slice(0, 8) + (parseInt(booking.Booking_Date.slice(8, 10)) + 1)}T${booking.From_Time}`,
          end: `${booking.Booking_Date.slice(0, 8) + (parseInt(booking.Booking_Date.slice(8, 10)) + 1)}T${booking.To_Time}`,
          description: booking.Description,
          backgroundColor: "#4285f4",
          borderColor: "#4285f4",
          textColor: "#fff",
        }));

        setEvents(calendarEvents);
        setFilteredEvents(calendarEvents); // Initially show all events
      } else {
        console.warn("No bookings found in response.");
        setEvents([]);
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEventsHandler = (venue) => {
    if (venue) {
      setFilteredEvents(events.filter((event) => event.title === venue));
    } else {
      setFilteredEvents(events);
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
    <div className="md:flex-row h-screen bg-gray-100">
      {userData.role === "user" ? (
        <Navbar username={userData.name} usermail={userData.email} />
      ) : (
        <Header />
      )}
      <div className="flex flex-col md:flex-row w-[1530px] ">
        <div className="m-3 w-[375px] bg-white shadow-lg space-y-6 p-2 pl-4 pt-4 rounded-lg ">
          <div className="flex ">
            <Link to={-1}>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full rotate-180 text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span class="sr-only">Icon description</span>
              </button>
            </Link>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
          </div>
          <div className=" max-h-[550px] overflow-auto">
            <ul className="space-y-6 flex flex-col items-center h-[530px] scrollbar-none ">
              {filteredEvents.length != 0 ? (
                filteredEvents.map((event, index) => (
                  <li
                    key={index}
                    className="p-4 mt-2 border-2 bg-white w-[300px] rounded-lg hover:shadow-xl cursor-default transition duration-300 transform hover:scale-105"
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
                )
                )) : (
                <li className="text-gray-500 text-center">No events found</li>
              )}
            </ul>
          </div>
        </div>

        <div className="relative m-3 p-4 overflow-auto h-[640px] w-[1100px] rounded-2xl bg-white shadow-xl">
          <select
            name="dropdown"
            id=""
            className="absolute left-[200px] bg-[#2563eb] cursor-pointer text-white h-[40px] w-[140px] p-2 rounded-md"
            onChange={(e) => filteredEventsHandler(e.target.value)}
          >
            <option value="">All Venues</option>
            {products.map((venue) => (
              <option key={venue.id} value={venue.name} className="bg-white text-black">
                {venue.name}
              </option>
            ))}
          </select>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={filteredEvents} // Use filtered events here
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventTextColor="#fff"
            eventBorderColor="#0056b3"
            height="auto"
            eventClick={(info) => setSelectedEvent(info.event)}
            eventClassNames="transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-xl"
            dayHeaderClassNames="bg-[#2563eb] text-white font-bold"
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
    </div>
  );
}

export default CalendarPage;

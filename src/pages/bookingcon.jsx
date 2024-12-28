import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/sidebar";
import BookingApproval from "../components/approval";
import axios from "axios";

import { MdOutlineRefresh } from "react-icons/md";
import filter from "../assets/filter.svg";

function BookingConfirmation() {
  const [Bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedFromTime, setSelectedFromTime] = useState("");
  const [selectedToTime, setSelectedToTime] = useState("");

  const setVenueDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/venues");
      setVenues(response.data.venues);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const VenueBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bookings");
      if (response.data && Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings);
      } else {
        console.warn("No VenueBookings found in response.");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    VenueBookings();
    setVenueDetails();
  }, []);

  const handleRowClick = (booking) => {
    if (booking) {
      setSelectedBooking(booking);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleVenueChange = (e) => setSelectedVenue(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);
  const handleStaffChange = (e) => setSelectedStaff(e.target.value);
  const handleFromTimeChange = (e) => setSelectedFromTime(e.target.value);
  const handleToTimeChange = (e) => setSelectedToTime(e.target.value);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedVenue("");
    setSelectedDate("");
    setSelectedLocation("");
    setSelectedStaff("");
    setSelectedFromTime("");
    setSelectedToTime("");
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prevBookings) =>
      prevBookings.map((product) =>
        product.id === id ? { ...product, Status: status } : product
      )
    );
  };

  const uniqueLocations = useMemo(() => {
    const locationSet = new Set(venues.map((venue) => venue.location));
    return [...locationSet];
  }, [venues]);

  
  const uniqueStaff = useMemo(() => {
    const temp = Bookings.filter((booking) => booking.Status === "Awaiting..");
    const Staffset = new Set(temp.map((booking) => booking.Staff));
    return [...Staffset];
  }, [venues]);


  const filteredBookings = useMemo(() => {
    return Bookings.filter((booking) => {
      const { Venue_Name, Location, Booking_Date, Staff, Status, From_Time, To_Time } = booking || {};

      const matchesSearch =
        (Venue_Name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (Location?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (Booking_Date && new Date(Booking_Date).toLocaleDateString()?.includes(searchQuery)) ||
        (Staff?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

      const matchesVenue = selectedVenue === "" || Venue_Name === selectedVenue;

      const matchesLocation = selectedLocation === "" || Location === selectedLocation;

      const matchesStaff = selectedStaff === "" || Staff === selectedStaff;

      const matchesDate =
        selectedDate === "" ||
        (Booking_Date && new Date(Booking_Date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString());

      const matchesFromTime =
        selectedFromTime === "" || (From_Time && From_Time >= selectedFromTime);

      const matchesToTime =
        selectedToTime === "" || (To_Time && To_Time <= selectedToTime);

      const isAwaiting = Status?.trim() === "Awaiting..";

      return matchesVenue && matchesDate && matchesLocation && matchesStaff && matchesFromTime && matchesToTime && isAwaiting;
    });
  }, [Bookings, searchQuery, selectedLocation, selectedStaff, selectedVenue, selectedDate, selectedFromTime, selectedToTime]);


  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Booking Confirmation</h2>

        <hr className="mb-4 border" />
        <div className="flex items-center border rounded-xl bg-white mb-7 h-content w-[1180px]">
          <img src={filter} alt="" className="ml-3" />
          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-20px]" />

          <div className="flex flex-col p-1 h-full items-center justify-center">
            <select
              onChange={handleVenueChange}
              value={selectedVenue}
              className="w-[170px] py-2 cursor-pointer rounded-lg focus:outline-none bg-white text-gray-700 overflow-hidden"
            >
              <option value="">Venue Name</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.name}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex flex-col p-1 h-full items-center justify-center">
            <select
              onChange={handleLocationChange}
              value={selectedLocation}
              className="w-[150px] py-2 cursor-pointer rounded-lg focus:outline-none bg-white text-gray-700"
            >
              <option value="">Location</option>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex flex-col h-full items-center justify-center">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-[140px] cursor-pointer h-full focus:outline-none text-gray-700"
            />
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex flex-col p-1 h-full items-center justify-center">
            <select
              value={selectedStaff}
              onChange={handleStaffChange}
              className="w-[120px] py-2 cursor-pointer rounded-lg focus:outline-none bg-white text-gray-700"
            >
              <option value="">All Staffs</option>
              {uniqueStaff.map((Staff, index) => (
                <option key={index} value={Staff}>
                  {Staff}
                </option>
              ))}
            </select>
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex flex-col h-full items-center justify-center">
            <input
              type="time"
              value={selectedFromTime}
              onChange={handleFromTimeChange}
              className="w-[120px] cursor-pointer h-full focus:outline-none text-gray-700"
            />
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex flex-col h-full items-center justify-center">
            <input
              type="time"
              value={selectedToTime}
              onChange={handleToTimeChange}
              className="w-[120px] cursor-pointer h-full focus:outline-none text-gray-700"
            />
          </div>

          <hr className="rotate-90 border w-12 ml-[-12px] mr-[-12px]" />
          <div className="flex items-center">
            <button
              onClick={resetFilters}
              className="px-4 py-2 flex items-center text-red-600"
            >
              <MdOutlineRefresh size={20} className="ml-[-18px] mr-[10px] " />
              <div>Reset Filters</div>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-[1102px] border bg-white overflow-x-auto sm:rounded-lg">
            <table className="w-[1100px] text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Venue Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">From Time</th>
                  <th className="px-6 py-3">To Time</th>
                  <th className="px-6 py-3">Booked Capacity</th>
                  <th className="px-6 py-3">Staff</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((product) => (
                    <tr
                      key={`${product.Venue_Name}-${product.Booking_Date}`}
                      className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(product)}
                    >
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {product.Venue_Name}
                      </th>
                      <td className="px-6 py-4">{product.Location}</td>
                      <td className="px-6 py-4">
                        {product.Booking_Date
                          ? new Date(product.Booking_Date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">{product.From_Time}</td>
                      <td className="px-6 py-4">{product.To_Time}</td>
                      <td className="px-14 py-4">{product.Booked_Capacity}</td>
                      <td className="px-6 py-4">{product.Staff}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center justify-center text-sm font-medium px-2 py-1 rounded-lg ${product.Status === "Approved"
                            ? "bg-[#ccf0eb] text-[#00b69b]"
                            : product.Status === "Rejected"
                              ? "bg-[#fcd7d4] text-[#ef3826]"
                              : "bg-[#ffeddd] text-[#ffa756]"
                            }`}
                        >
                          {product.Status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No "Awaiting" bookings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <BookingApproval
            booking={selectedBooking}
            closeModal={closeModal}
            updateBookingStatus={updateBookingStatus}
          />
        </div>
      )}
    </div>
  );
}

export default BookingConfirmation;


import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import BookingApproval from "../components/approval";
import axios from "axios";

function Bookingconformation() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const VenueBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bookings");
      if (response.data && Array.isArray(response.data.bookings)) {
        setProducts(response.data.bookings);
      } else {
        console.warn("No VenueBookings found in response.");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    VenueBookings();
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const updateBookingStatus = (id, status) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, Status: status } : product
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    const { Venue_Name, Location, Booking_Date, Staff, Status } = product || {};
    const matchesSearch =
      (Venue_Name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (Location?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (Booking_Date && new Date(Booking_Date).toLocaleDateString()?.includes(searchQuery)) ||
      (Staff?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesSearch && Status?.trim() === "Awaiting..";
  });

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">Booking Confirmation</h2>

        <div className="flex justify-start p-4">
          <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-sm px-7 py-1">
            <FaSearch className="text-gray-400 mr-3 text-xl" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none text-lg"
            />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Venue Name</th>
                <th scope="col" className="px-6 py-3">Location</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">From Time</th>
                <th scope="col" className="px-6 py-3">To Time</th>
                <th scope="col" className="px-6 py-3">Booked Capacity</th>
                <th scope="col" className="px-6 py-3">Staff</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={`${product.Venue_Name}-${product.Booking_Date}`}
                    className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(product)}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.Venue_Name}
                    </th>
                    <td className="px-6 py-4">{product.Location}</td>
                    <td className="px-6 py-4">{product.Booking_Date ? new Date(product.Booking_Date).toLocaleDateString() : "N/A"}</td>
                    <td className="px-6 py-4">{product.From_Time}</td>
                    <td className="px-6 py-4">{product.To_Time}</td>
                    <td className="px-16 py-4">{product.Booked_Capacity}</td>
                    <td className="px-6 py-4">{product.Staff}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded 
                          ${product.Status === "Approved" ? "inline-flex items-center justify-center bg-[#ccf0eb] text-sm text-[#00b69b] font-medium px-2 py-1 w-[90px] rounded-lg" :
                            product.Status === "Rejected" ? "inline-flex items-center justify-center bg-[#fcd7d4] text-sm font-medium text-[#ef3826] px-2 py-1 w-[90px] rounded-lg" :
                              "inline-flex items-center justify-center bg-[#ffeddd] text-sm font-medium text-[#ffa756] px-2 py-1 w-[90px] rounded-lg"}`}
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

export default Bookingconformation;

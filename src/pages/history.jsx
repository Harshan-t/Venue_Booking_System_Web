import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import BookingApproval from "../components/approval";

function History() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const VenueBookings = () => {
    axios
      .get("http://localhost:8000/bookings")
      .then((response) => {
        if (response.data && Array.isArray(response.data.bookings)) {
          setProducts(response.data.bookings);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        setProducts([]);
      });
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredProducts = products.filter((product) => {
    const { Venue_Name, Location, Booking_Date, Staff, Status } = product || {};

    const matchesSearchQuery =
      (Venue_Name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (Location?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (new Date(Booking_Date).toLocaleDateString()?.includes(searchQuery) || false) ||
      (Staff?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

    const matchesStatus = (filterStatus === "all" || Status === filterStatus) && (Status === "Approved" || Status === "Rejected");

    return matchesSearchQuery && matchesStatus;
  });

  const updateBookingStatus = (id, status) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, Status: status } : product
      )
    );
  };

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">History</h2>

        <div className="flex justify-start p-4">
          <div className="bg-white flex items-center w-[300px] max-w-md shadow-sm border-2 rounded-2xl shadow-sm px-4 py-1">
            <FaSearch className="text-gray-400 mr-3 text-xl" size={19} />
            <input
              type="text"
              placeholder="Search History..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none p-1"
            />
          </div>
        </div>

        <div className="flex justify-start space-x-4 mb-4">
          <button
            onClick={() => handleFilterStatus("all")}
            className={`bg-[#e5e4e9] text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md border hover:bg-[#e8e8e8] cursor-pointer ${filterStatus === "all" ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-white hover:bg-[#cbccee]"}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterStatus("Approved")}
            className={`bg-[#e5e4e9] text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md border hover:bg-[#e8e8e8] cursor-pointer ${filterStatus === "Approved" ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-white hover:bg-[#cbccee]"}`}
          >
            Approved
          </button>
          <button
            onClick={() => handleFilterStatus("Rejected")}
            className={`bg-[#e5e4e9] text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md border hover:bg-[#e8e8e8] cursor-pointer ${filterStatus === "Rejected" ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-white hover:bg-[#cbccee]"}`}
          >
            Rejected
          </button>
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
                    className="bg-white border-bhover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(product)}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.Venue_Name}
                    </th>
                    <td className="px-6 py-4">{product.Location}</td>
                    <td className="px-6 py-4">{new Date(product.Booking_Date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{product.From_Time}</td>
                    <td className="px-6 py-4">{product.To_Time}</td>
                    <td className="px-16 py-4">{product.Booked_Capacity}</td>
                    <td className="px-6 py-4">{product.Staff}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded 
                          ${product.Status === "Approved" ? "inline-flex items-center justify-center bg-[#ccf0eb] text-sm text-[#00b69b] font-medium px-2 py-1 w-[90px] rounded-lg" : "inline-flex items-center justify-center bg-[#fcd7d4] text-sm font-medium text-[#ef3826] px-2 py-1 w-[90px] rounded-lg"}`}
                      >
                        {product.Status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedBooking && (
          <BookingApproval
            booking={selectedBooking}
            closeModal={() => setIsModalOpen(false)}
            updateBookingStatus={updateBookingStatus}
          />
        )}
      </div>
    </div>
  );
}

export default History;

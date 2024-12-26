
import { FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import RejectionReason from "./rejection";

const BookingApproval = ({ booking, closeModal, updateBookingStatus }) => {
  const [status, setStatus] = useState(booking?.status || null);
  const [rejectionReason, setRejectionReason] = useState("");
  
  if (!booking) return null;

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    const statusData = { status: newStatus };

    if (newStatus === "Rejected" && rejectionReason.trim()) {
      statusData.reason = rejectionReason;
    }

    axios
      .put(`http://localhost:8000/bookings/${booking.id}/status`, statusData)
      .then((response) => {
        console.log("Status updated:", response.data);
        updateBookingStatus(booking.id, newStatus);
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating status:", error);

      });
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-5 space-y-4">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <FaRegCalendarAlt className="text-blue-600 text-xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{booking.Staff}</h2>
              <p className="text-sm text-gray-500">Booking Details</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Name:</label>
            <input
              type="text"
              value={booking.Venue_Name}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Booked Capacity:</label>
              <input
                type="text"
                value={`${booking.Booked_Capacity} people`}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Venue Capacity:</label>
              <input
                type="text"
                value={booking.Venue_Capacity ? `${booking.Venue_Capacity} people` : "Not specified"}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              value={booking.Location}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">Date:</label>
              <input
                type="text"
                value={new Date(booking.Booking_Date).toLocaleDateString()}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">From Time:</label>
              <input
                type="text"
                value={booking.From_Time}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">To Time:</label>
              <input
                type="text"
                value={booking.To_Time}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              value={booking.Description || "No description provided"}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {status === "Rejected" && (
          <RejectionReason
            rejectionReason={rejectionReason}
            setRejectionReason={setRejectionReason}
          />
        )}

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => handleStatusChange("Rejected")}
            className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Reject
          </button>
          <button
            onClick={() => handleStatusChange("Approved")}
            className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingApproval;

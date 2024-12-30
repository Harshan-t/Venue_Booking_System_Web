import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingApproval from "../components/approval";

function AdminTable({ limit = 10, searchTerm = '', statusFilter = 'All', history = false }) {
    const [details, setdetails] = useState([]);
    const [start, setstart] = useState(0);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setDetail = async () => {
        if (history) {
            const result = await axios.get('http://localhost:8000/bookings');
            setdetails(result.data.bookings.filter(booking => booking.Status === "Approved" || booking.Status === "Rejected"));
        } else {
            const result = await axios.get('http://localhost:8000/bookings');
            setdetails(result.data.bookings);
        }
    };

    const handleRowClick = (booking) => {
        if (booking) {
            setSelectedBooking(booking);
            setIsModalOpen(true);
        }
    };

    const updateBookingStatus = (id, status) => {
        setBookings((prevBookings) =>
            prevBookings.map((product) =>
                product.id === id ? { ...product, Status: status } : product
            )
        );
    };

    useEffect(() => {
        setDetail();
    }, []);

    const filteredDetails = details.filter((detail) => {
        const matchesSearch = detail.Venue_Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStaff = detail.Staff.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || detail.Status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus && matchesStaff;
    });

    const handlenext = () => {
        setstart(start + limit);
    };
    const handleprevious = () => {
        setstart(start - limit);
    };

    return (
        <div className='flex flex-col items-center'>
            <table className="w-[1200px] text-sm text-left rounded-xl">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Venue name</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">From Time</th>
                        <th scope="col" className="px-6 py-3">To Time</th>
                        <th scope="col" className="px-6 py-3">Booked Capacity</th>
                        <th scope="col" className="px-6 py-3">Staff</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredDetails.length > 0 ? (
                        filteredDetails.slice(start, start + limit).map((detail, index) => (
                            <tr key={index} className="bg-white border-t hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(detail)}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {detail.Venue_Name}
                                </th>
                                <td className="px-6 py-4">{detail.Location}</td>
                                <td className="px-6 py-4">{new Date(detail.Booking_Date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{detail.From_Time}</td>
                                <td className="px-6 py-4">{detail.To_Time}</td>
                                <td className="px-16 py-4">{detail.Booked_Capacity}</td>
                                <td className="px-6 py-4">{detail.Staff}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center justify-center text-sm font-medium px-2 py-1 w-[90px] rounded-lg ${detail.Status === "Approved"
                                        ? "bg-[#ccf0eb] text-[#00b69b]"
                                        : detail.Status === "Rejected"
                                            ? "bg-[#fcd7d4] text-[#ef3826]"
                                            : "bg-[#ffeddd] text-[#ffa756]"
                                        }`}>
                                        {detail.Status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                No Bookings available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && selectedBooking && (
                <BookingApproval
                    booking={selectedBooking}
                    closeModal={() => setIsModalOpen(false)}
                    updateBookingStatus={updateBookingStatus}
                />
            )}

            {(
                <tfoot className='w-[100%]'>
                    <tr className='flex mt-5 mx-5 justify-between'>
                        <div className="text-center mr-4 text-gray-500">
                            {start > 0 ? (
                                <button onClick={handleprevious} className="bg-[#e5e4e9] text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-[#e8e8e8]">Previous</button>
                            ) : (
                                <button className="bg-[#f5f5f5] text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed" disabled>Previous</button>
                            )}
                        </div>
                        <div className="text-center text-gray-500">
                            {start + limit < filteredDetails.length ? (
                                <button onClick={handlenext} className="bg-[#e5e4e9] text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-[#e8e8e8]">Next</button>
                            ) : (
                                <button className="bg-[#f5f5f5] text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed" disabled>Next</button>
                            )}
                        </div>
                    </tr>
                </tfoot>
            )}
        </div>
    );
}

export default AdminTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table({ staffmail, limit, next = false, searchTerm= '', statusFilter= 'All' }) {
    const [details, setdetails] = useState([]);
    const [start, setstart] = useState(0);

    const setDetail = async () => {
        const result = await axios.get('http://localhost:8000/bookings');
        setdetails(result.data.bookings.filter(booking => booking.email === staffmail));
    };

    useEffect(() => {
        setDetail();
    }, [staffmail]);

    const filteredDetails = details.filter((detail) => {
        const matchesSearch = detail.Venue_Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || detail.Status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handlenext = () => {
        setstart(start + limit);
    };
    const handleprevious = () => {
        setstart(start - limit);
    };

    return (
        <div className='flex flex-col items-center'>
            <table className="w-[1100px] text-sm text-left rounded-xl">
                <thead className="text-gray-700 uppercase bg-[#f5f5f5] rounded-xl">
                    <tr className="">
                        <th scope="col" className="px-6 py-3">Venue name</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Participants</th>
                        <th scope="col" className="px-6 py-3">Capacity</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredDetails.length > 0 ? (
                        filteredDetails.slice(start, start + limit).map((detail, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {detail.Venue_Name}
                                </th>
                                <td className="px-6 py-4">{detail.Location}</td>
                                <td className="px-6 py-4">{new Date(detail.Booking_Date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{detail.Booked_Capacity}</td>
                                <td className="px-6 py-4">{detail.Venue_Capacity}</td>
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
            {next && (
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

export default Table;

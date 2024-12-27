import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import axios from "axios";

import Sidebar from "../components/sidebar";
import Usage from '../components/usage';

import { FaUser, FaMapMarkerAlt, FaClipboardCheck, FaTimesCircle, FaArrowRight } from "react-icons/fa";
import "../styles/dashboardhome.css";

function Dashboardhome() {
    const [Staff, setStaff] = useState([]);
    const [Venues, setVenues] = useState([]);
    const [Booked, setBooked] = useState([]);
    const [Unreserved, setUnreserved] = useState([]);

    const setstaffdetails = () => {
        axios.get("http://localhost:8000/staffpage")
            .then(response => {
                if (response.data && response.data.staffdetails) {
                    setStaff(response.data.staffdetails);
                } else {
                    console.error("Invalid response format:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching staff details:", error);
            });
    };

    const setVenueDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8000/venues");
            if (response.data && Array.isArray(response.data.venues)) {
                setVenues(response.data.venues);
            } else {
                throw new Error("Invalid venue data");
            }
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    const setBookingDetail = async () => {
        const result = await axios.get('http://localhost:8000/bookings');
        setBooked(result.data.bookings.filter(booking => booking.Status === 'Approved' && booking.Date.getmonth() === new Date().getmonth()));
    };

    useEffect(() => {
        setstaffdetails();
        setVenueDetails();
        setBookingDetail();
    }, []);

    const cardData = [
        { title: "Total Staffs", value: Staff.length, icon: <FaUser className="text-purple-500" /> },
        { title: "Total Venues", value: Venues.length, icon: <FaMapMarkerAlt className="text-yellow-400" /> },
        { title: "Booked Venues", value: Booked.length, icon: <FaClipboardCheck className="text-green-500" /> },
        { title: "Unreserved Venues", value: 20, icon: <FaTimesCircle className="text-red-500" /> },
    ];

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-col p-4 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Dashboard</h2>

                <div className="grid grid-cols-4 gap-6 mb-8 cursor-default">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="flex items-center p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-200"
                        >
                            <div className="p-3 bg-gray-200 rounded-2xl text-2xl mr-4">
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="text-sm text-gray-600">{card.title}</h3>
                                <p className="text-2xl font-extrabold text-gray-800">
                                    <CountUp end={card.value} duration={2} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold mb-4">Usage details</h3>
                        <Link to='/analyticsvenue' state={[
                            { title: "Total Staffs", value: Staff.length, icon: "FaUser" },
                            { title: "Total Venues", value: Venues.length, icon: "FaMapMarkerAlt" },
                            { title: "Booked Venues", value: 30, icon: "FaClipboardCheck" },
                            { title: "Unreserved Venues", value: 20, icon: "FaTimesCircle" },
                        ]}>
                            <button className="flex items-center bg-[#dbeafe] text-[#2563eb] border border-[#2563eb] p-1 px-4 rounded-2xl">
                                Detailed Usage <FaArrowRight className="ml-2" />
                            </button>
                        </Link>
                    </div>
                    <Usage />
                </div>
            </div>
        </div >
    );
}

export default Dashboardhome;

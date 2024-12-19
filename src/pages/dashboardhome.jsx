
import "../styles/dashboardhome.css";
import React from "react";
import Sidebar from "../components/sidebar";
import { FaUser, FaMapMarkerAlt, FaClipboardCheck, FaTimesCircle } from "react-icons/fa";
import Usage from '../components/usage';
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
function Dashboardhome() {
    const cardData = [
        { title: "Total Staffs", value: 2582, icon: <FaUser className="text-purple-500" /> },
        { title: "Total Venues", value: 920, icon: <FaMapMarkerAlt className="text-yellow-400" /> },
        { title: "Booked Venues", value: 823, icon: <FaClipboardCheck className="text-green-500" /> },
        { title: "Unreserved Venues", value: 97, icon: <FaTimesCircle className="text-red-500" /> },
    ];

    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-col p-4 w-full lg:w-4/5">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Dashboard</h2>

                <div className="grid grid-cols-4 gap-6 mb-8">
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
                    <Link to={'/analyticsvenue'}>
                        <h3 className="text-lg font-semibold mb-4">Usage details</h3>
                        <Usage />
                    </Link>
                </div>

                <div className="py-8">
                    {/* table */}
                </div>
            </div>
        </div>
    );
}

export default Dashboardhome;

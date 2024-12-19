import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Titlebar from "../assets/Titlebar.png";
import { IoMdCalendar } from "react-icons/io";
import { FaVideo, FaMicrophone, FaSnowflake, FaSearch } from "react-icons/fa";

import Venuepng from "../assets/Venuepng.png";

function VenueContainer({ venue, capacity, location, type, photo, projector, ac, micAndSpeaker }) {

    return (
        <div className="flex justify-center mb-8 hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col bg-white shadow-lg rounded-xl w-[80vw] max-w-[900px] overflow-hidden p-6 border border-gray-200">
                <div className="flex items-center">
                    <img
                        src={photo || Venuepng}
                        alt={venue}
                        className="w-[180px] h-[180px] object-cover rounded-lg shadow-md border"
                    />

                    <div className="ml-8 flex justify-between w-full">
                        <div className="flex flex-col justify-between">
                            <h2 className="font-semibold text-3xl text-gray-800 mb-2">{venue}</h2>
                            <div className="text-gray-600 space-y-1">
                                <p className="flex justify-between">
                                    <span className="font-medium w-48">Maximum Capacity:</span>
                                    <span>{capacity}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-medium w-48">Location:</span>
                                    <span>{location}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-medium w-48">Type:</span>
                                    <span>{type}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start space-y-3 justify-center">
                            {projector != 0 && (
                                <div className="flex items-center text-green-500 font-medium">
                                    <FaVideo className="mr-2" /> Projector
                                </div>
                            )}
                            {ac != 0 && (
                                <div className="flex items-center text-blue-500 font-medium">
                                    <FaSnowflake className="mr-2" /> Air Conditioning
                                </div>
                            )}
                            {micAndSpeaker != 0 && (
                                <div className="flex items-center text-orange-500 font-medium">
                                    <FaMicrophone className="mr-2" /> Mic & Speaker
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-300" />

                <Link
                    to="/book"
                    state={{ Venue: venue, capacity: capacity, location: location }}
                    className="self-end"
                >
                    <button className="flex items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                        <IoMdCalendar size={"20px"} className="mr-2" />
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default function UserVenue() {
    const [Venues, setVenues] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const setVenueDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8000/venues");
            setVenues(response.data.venues);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    useEffect(() => {
        setVenueDetails();
    }, []);

    const filteredVenues = Venues.filter((venue) => {
        return (
            venue?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue?.type?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    return (
        <div className="bg-[#f4f4f4]">
            <Navbar />
            <div className="relative">
                <img
                    src={Titlebar}
                    alt="Title Bar"
                    className="w-full h-[250px] object-cover"
                />
                <div className="absolute top-16 left-20 text-white font-bold text-4xl">
                    Venue List
                </div>
                <div className="absolute top-28 left-20 text-white text-lg">
                    Home &gt; Venues
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <div className="bg-white shadow-md w-[80%] p-4 px-10 rounded-lg text-center text-gray-700 font-medium text-lg flex justify-between items-center">
                    {filteredVenues.length} Venues Available

                    <div className="flex justify-start ">
                        <div className="flex items-center w-full max-w-md bg-[#eceded] rounded-full shadow-sm px-6 py-2">
                            <FaSearch className="text-gray-400 mr-3 text-xl" />
                            <input
                                type="text"
                                placeholder="Search venues..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mt-8">
                {filteredVenues.length > 0 ? (
                    filteredVenues.map((venue) => (
                        <VenueContainer
                            venue={venue.name}
                            capacity={venue.capacity}
                            location={venue.location}
                            type={venue.type}
                            photo={venue.photo}
                            projector={venue.projector}
                            ac={venue.ac}
                            micAndSpeaker={venue.micAndSpeaker}
                        />
                    ))
                ) : (
                    <div className="text-gray-500 text-xl mt-8">
                        No venues match your search.
                    </div>
                )}
            </div>
        </div>
    );
}
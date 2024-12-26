import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Titlebar from "../assets/Titlebar.png";
import { IoMdCalendar } from "react-icons/io";
import { FaVideo, FaMicrophone, FaSnowflake, FaSearch } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";

import Venuepng from "../assets/Venuepng.svg";

function VenueContainer({ venue, capacity, location, type, photo, projector, ac, micAndSpeaker }) {
    return (
        <div className="flex justify-center mb-8 hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col bg-white shadow-lg rounded-xl w-[80vw] max-w-[900px] overflow-hidden p-6 border border-gray-200">
                <div className="flex items-center">
                    <img
                        src={photo ? photo : Venuepng}
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
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [filters, setFilters] = useState({ max_capacity: "", min_capacity: "", location: "", type: "", ac: false, projector: false, micAndSpeaker: false });

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
            venue?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filters.min_capacity ? venue.capacity >= filters.min_capacity : true) &&
            (filters.max_capacity ? venue.capacity <= filters.max_capacity : true) &&
            (filters.location ? venue.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
            (filters.type ? venue.type.toLowerCase().includes(filters.type.toLowerCase()) : true) &&
            (filters.ac ? venue.ac : true) &&
            (filters.projector ? venue.projector : true) &&
            (filters.micAndSpeaker ? venue.micAndSpeaker : true)
        );
    });

    return (
        <div className="bg-[#f4f4f4] min-h-screen">
            <Navbar />
            <div className="relative">
                <div class="absolute inset-0 bg-black-600/50 backdrop-blur-sm z-10"></div>
                <img
                    src={Titlebar}
                    alt="Title Bar"
                    className="w-full h-[250px] object-cover"
                />
                <div className="absolute z-20 top-[90px] left-20 text-white font-bold text-4xl">
                    Venue List
                </div>
                <div className="absolute z-20 top-[130px] left-20 text-white text-lg">
                    Home &gt; Venues
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <div className="bg-white shadow-md w-[80%] p-4 px-10 rounded-lg text-center text-gray-700 font-medium text-lg flex justify-between items-center">
                    {filteredVenues.length} Venues Available

                    <div className="flex justify-start ">
                        <div className="flex items-center w-full max-w-md shadow-sm border-2 rounded-2xl shadow-sm px-6 py-1">
                            <FaSearch className="text-gray-400 mr-3 text-xl" />
                            <input
                                type="text"
                                placeholder="Search venues..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none text-lg"
                            />
                        </div>
                        <div
                            className="flex items-center ml-4 shadow-sm border-2 rounded-2xl px-4 cursor-pointer py-1"
                            onClick={() => setShowFilterPopup(true)}
                        >
                            <MdFilterList size="23px" className="mr-3 flex items-center" />
                            Filter
                        </div>
                    </div>
                </div>
            </div>

            {showFilterPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Filter Venues</h2>
                        <div className="grid grid-cols-2 ">
                            <div>
                                <label htmlFor="">Minimum Capacity</label>
                                <input
                                    type="number"
                                    placeholder="Minimum Capacity"
                                    value={filters.min_capacity}
                                    onChange={(e) => setFilters({ ...filters, min_capacity: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Maximum Capacity</label>
                                <input
                                    type="number"
                                    placeholder="Maximum Capacity"
                                    value={filters.max_capacity}
                                    onChange={(e) => setFilters({ ...filters, max_capacity: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Location</label>
                                <select
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white text-gray-700"
                                >
                                    <option value="">All</option>
                                    <option value="Sunflower Block">Sunflower Block</option>
                                    <option value="Daisy Block">Daisy Block</option>
                                    <option value="Rosewood Block">Rosewood Block</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white text-gray-700"
                                >
                                    <option value="">All</option>
                                    <option value="Seminar Hall">Seminar Hall</option>
                                    <option value="Conference Room">Conference Room</option>
                                    <option value="Auditorium">Auditorium</option>
                                </select>
                            </div>
                            <div className="flex items-center ml-2">
                                <input
                                    type="checkbox"
                                    checked={filters.ac}
                                    onChange={(e) => setFilters({ ...filters, ac: e.target.checked })}
                                    className="mr-2 size-4"
                                />
                                <label>Air Conditioning</label>
                            </div>
                            <div className="flex items-center ml-2">
                                <input
                                    type="checkbox"
                                    checked={filters.projector}
                                    onChange={(e) => setFilters({ ...filters, projector: e.target.checked })}
                                    className="mr-2 size-4"
                                />
                                <label>Projector</label>
                            </div>
                            <div className="flex items-center ml-2">
                                <input
                                    type="checkbox"
                                    checked={filters.micAndSpeaker}
                                    onChange={(e) => setFilters({ ...filters, micAndSpeaker: e.target.checked })}
                                    className="mr-2 size-4"
                                />
                                <label>Mic & Speaker</label>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-green-200 rounded-lg text-green-600"
                                onClick={() => setShowFilterPopup(false)}
                            >
                                OK
                            </button>
                            <button
                                className="px-4 py-2 bg-red-200 rounded-lg text-red-600"
                                onClick={() => {
                                    setFilters({
                                        max_capacity: "",
                                        min_capacity: "",
                                        location: "",
                                        type: "",
                                        ac: false,
                                        projector: false,
                                        micAndSpeaker: false,
                                    });
                                    setSearchQuery("");
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

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
        </div >
    );
}

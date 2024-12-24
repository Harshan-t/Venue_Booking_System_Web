import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Titlebar from "../assets/Titlebar.png";
import UserNavbar from "../components/UserNavbar";
import { UserContext } from '../../UserContext.jsx';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function UserQueries() {
    const { userData } = useContext(UserContext);
    const [venue, setVenue] = useState();
    const [subject, setSubject] = useState();
    const [comments, setComments] = useState();
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();  // Initialize the navigate function

    const setOptionsDetails = async () => {
        const response = await axios.get('http://localhost:8000/venues');
        const names = response.data.venues.map(venue => venue.name);
        setOptions(names);
    };

    useEffect(() => {
        setOptionsDetails();
    }, []);

    const handleConfirm = async (event) => {
        event.preventDefault();  // Prevent form default submission behavior

        try {
            const payload = {
                Venue_Name: venue,
                subject: subject,
                comments: comments,
                staffname: userData.name,
                Email: userData.email
            };
            const response = await axios.post("http://localhost:8000/userqueries", payload);

            if (response.status === 200) {
                navigate("/user/dashboard");
            } else {
                alert("Failed to confirm booking. Please try again.");
            }
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Failed to confirm booking. Please try again.");
        }
    };

    return (
        <div className="bg-[#f4f4f4] min-h-screen">
            <Navbar />
            <form onSubmit={handleConfirm}>
                <div className='relative'>
                    <div class="absolute inset-0 bg-black-600/50 backdrop-blur-sm z-10"></div>
                    <img src={Titlebar} alt="" className='w-full h-[250px] object-cover' />
                    <div className='z-50 flex justify-center absolute top-[90px] text-white font-bold text-4xl left-20'>User Profile</div>
                    <div className='absolute z-50 top-[130px] left-20 text-white'>Home &gt; Profile &gt; Queries</div>
                </div>
                <UserNavbar />
                <div className="flex justify-center">
                    <div className="relative flex flex-col mt-5 mb-5 p-7 rounded-lg w-[1200px] shadow-lg bg-white border border-grey-400">
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="venue" className="block mb-2 text-xl font-[600] text-gray-900">NAME</label>
                                <input type="text" id="venue" value={userData.name} placeholder="Enter your Name" className="bg-gray-50 mb-8 border border-gray-300 text-gray-900 rounded-lg block w-[560px] p-2.5 focus:outline-none cursor-default" readOnly />
                            </div>
                            <div>
                                <label htmlFor="venue" className="block text-xl font-[600] mb-2 text-gray-900">Venue</label>
                                <select
                                    type="text"
                                    id="venue"
                                    className="bg-gray-50 mb-8 border border-gray-300 text-gray-900 rounded-lg block w-[560px] p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                    onChange={(e) => setVenue(e.target.value)}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select Venue
                                    </option>
                                    {options &&
                                        options.map(element => (
                                            <option key={element} value={element}>{element}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-xl font-[600] text-gray-900">SUBJECT</label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="Enter Subject"
                                onChange={(e) => setSubject(e.target.value)}
                                className="bg-gray-50 mb-8 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                required />
                        </div>
                        <div>
                            <label htmlFor="comments" className="text-xl font-[600] text-gray-900 block mb-2">COMMENTS</label>
                            <textarea
                                placeholder="Enter your Queries"
                                onChange={(e) => setComments(e.target.value)}
                                className='bg-[#f9fafb] overflow-hidden resize-none border rounded-lg w-full h-[130px] border-[#d1d5db] p-3 focus:outline-none focus:border-[#1a73e8] focus:shadow-md'
                            />
                            <div className='flex justify-end text-sm text-gray-500'>Maximum 500 characters</div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full h-full sm:w-auto px-4 py-2.5 text-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserQueries;

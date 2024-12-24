import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import UserNavbar from "../components/UserNavbar";
import Table from "../components/UserTable.jsx";
import { UserContext } from '../../UserContext.jsx';
import { FaSearch } from "react-icons/fa";
import Titlebar from "../assets/Titlebar.png";

function UserBookings() {
    const { userData } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleStatusChange = (status) => {
        setStatusFilter(status);
    };

    return (
        <div>
            <div className="bg-[#f4f4f4] min-h-screen">
                <Navbar />
                <div className='relative'>
                    <div class="absolute inset-0 bg-black-600/50 backdrop-blur-sm z-10"></div>
                    <img src={Titlebar} alt="" className='w-full h-[250px] object-cover' />
                    <div className='z-50 absolute top-[90px] text-white font-bold text-4xl left-20'>User Profile</div>
                    <div className='absolute z-50 top-[130px] left-20 text-white'>Home &gt; Profile &gt; My Bookings</div>
                </div>
                <UserNavbar />
                <div className="flex justify-center">
                    <div className="relative shadow-lg flex justify-between bg-[#f5f5f5] border border-[#e7e7e7] mt-5 mb-5 py-3 px-6 rounded-lg shadow-xl text-[#6b7385] w-[1000px]">
                        <div className="flex items-center">
                            {["All", "Approved", "Rejected", "Awaiting.."].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    className={`py-3 w-[110px] px-6 rounded-lg hover:cursor-pointer ${statusFilter === status ? "bg-[#999bbe] text-white" : "bg-white hover:text-white hover:bg-[#cbccee]"} mr-5`}
                                    onClick={() => handleStatusChange(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-start p-4">
                            <div className="flex items-center w-[300px] bg-white rounded-3xl shadow-sm p-3">
                                <FaSearch className="text-gray-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative shadow-lg flex flex-col bg-white mt-5 mb-5 p-10 rounded-lg w-[1200px]">
                        <div className="text-2xl font-semibold mb-6">My Bookings</div>
                        <Table
                            staffmail={userData.email}
                            limit={10}
                            next={true}
                            searchTerm={searchTerm}
                            statusFilter={statusFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBookings;

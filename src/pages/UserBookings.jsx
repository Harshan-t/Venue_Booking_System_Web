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
            <div>
                <Navbar />
                <div className='relative'>
                    <img src={Titlebar} alt="" className='min-w-[1500px] w-[2000px] min-h-[200px] relative' />
                    <div className='z-50 flex justify-center absolute top-16 text-white font-bold text-4xl left-24'>User Profile</div>
                    <div className='absolute top-28 left-24 text-white'>Home</div>
                </div>
                <UserNavbar />
                <div className="flex justify-center">
                    <div className="relative shadow-lg flex justify-between bg-[#f5f5f5] border border-[#eaedf0] mt-5 mb-5 py-3 px-6 rounded-lg shadow-xl text-[#6b7385] w-[1000px]">
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

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Titlebar from "../assets/Titlebar.png";
import UserNavbar from "../components/UserNavbar";
import Table from "../components/UserTable.jsx";
import { UserContext } from '../../UserContext.jsx'
import { FaUserTie } from "react-icons/fa";

function UserDashboard() {
    const { userData } = useContext(UserContext);
    const [details, setdetails] = useState([])
    const [staffdetails, setstaffdetails] = useState([{}]);
    const date = new Date();

    const setDetail = async () => {
        const result = await axios.get('http://localhost:8000/bookings')
        setdetails(result.data.bookings.filter(booking => booking.email === userData.email && new Date(booking.Booking_Date).getDate() === date.getDate()))
    }

    const setstaffdetail = async () => {
        const result = await axios.get('http://localhost:8000/staffpage')
        setstaffdetails(result.data.staffdetails.filter(staff => staff.email === userData.email))
    }

    useEffect(() => {
        setDetail()
        setstaffdetail()
    }, [userData.email])

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

                <div className="flex justify-center mt-7">
                    <div className="bg-white min-w-[700px] w-[1100px] h-[230px] border-white shadow-lg rounded-xl p-6 flex items-center">
                        <div className="flex items-center justify-center min-w-[100px] w-[130px] h-[140px] ml-8 border-white rounded-xl">
                            <FaUserTie size="120px" />
                        </div>
                        <div className="ml-5 flex flex-col">
                            <div className="text-2xl font-[700] mb-3 mt-[-10px]"> {userData.name}</div>
                            <div className=" text-[#6b7385]">Depatment of {staffdetails[0].department}</div>
                            <div className=" text-[#6b7385] mt-1">{staffdetails[0].email}</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center"><hr className="mt-7 mb-7 border-[2px] border-[#d1d1d1] w-[1300px]" ></hr></div>

                <div className="flex justify-center mb-4">
                    <div className="bg-white min-w-[700px] w-[1100px] border-white shadow-lg rounded-xl py-6 px-6">
                        <div className="text-2xl font-[600] mb-6">Today's Events</div>
                        <hr className="border" />

                        <div className="mt-4 flex justify-evenly font-[500] ">
                            <table className="w-[1000px] text-sm text-left">
                                <thead className="text-gray-700 uppercase bg-[#f5f5f5]">
                                    <tr className="px-6 py-3">
                                        <th scope="col" className="px-6 py-3">Venue name</th>
                                        <th scope="col" className="px-6 py-3">Start Time</th>
                                        <th scope="col" className="px-6 py-3">End Time</th>
                                        <th scope="col" className="px-6 py-3">location</th>
                                        <th scope="col" className="px-6 py-3">Participants</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {details.length > 0 ? (
                                        details.map((detail, index) => (
                                            detail.Status === "Approved" &&
                                            <tr key={index} className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {detail.Venue_Name}
                                                </th>
                                                <td className="px-6 py-4">{detail.From_Time}</td>
                                                <td className="px-6 py-4">{detail.To_Time}</td>
                                                <td className="px-6 py-4">{detail.Location}</td>
                                                <td className="px-12 py-4">{detail.Booked_Capacity}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No Events Today.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="flex justify-center"><hr className="mt-7 mb-7 border-[2px] border-[#d1d1d1] w-[1300px]" ></hr></div>
                <div className="flex justify-center">
                    <div className="relative shadow-lg bg-white mt-5 mb-5 p-10 rounded-lg w-[1200px]">
                        <div className="text-2xl font-[600] mb-6">My Bookings</div>
                        <Table staffmail={userData.email} limit={5} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard;
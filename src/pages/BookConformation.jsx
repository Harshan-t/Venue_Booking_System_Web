import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from '../../UserContext.jsx'

import Navbar from '../components/Navbar'
import Titlebar from '../assets/Titlebar.png'
import Success from "../components/Success.jsx";

import { IoArrowForwardCircleOutline } from "react-icons/io5";

function Detail({ label, value }) {
    return (
        <div className='flex min-w-[370px] mb-4'>
            <span className='flex justify-between min-w-[170px] mr-[7px]'>
                <div>{label}</div><div>:</div>
            </span>
            {value}
        </div>
    )
}

function Conformation() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state || {};
    const { userData } = useContext(UserContext);
    const [success, setSuccess] = useState(false);
    

    const handleConfirm = async () => {
        try {
            const payload = {
                Venue_Name: data.Venue,
                Location: data.Venuelocation,
                Booking_Date: data.Date,
                From_Time: data.st_time,
                To_Time: data.ed_time,
                Booked_Capacity: data.no_par,
                Venue_Capacity: data.max_cap,
                Description: data.Desc,
                staffname: userData.name,
                Email: userData.email
            };

            const response = await axios.post("http://localhost:8000/staffbookings", payload);

            if (response.status === 200) {
                console.log("Booking confirmed successfully!");
                setSuccess(true);
            }
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Failed to confirm booking. Please try again.");
        }
    };

    return (
        <div>
            {success && <Success />}
            <div className='bg-[#F5F6FA] h-full min-h-screen'>
                <Navbar username={data.name} usermail={data.email} />
                <div className='relative'>
                    <img src={Titlebar} alt="" className='min-w-[1500px] w-[2000px] min-h-[200px] relative' />
                    <div className='z-50 flex justify-center absolute top-16 text-white font-bold text-4xl left-24'>Book Venue</div>
                    <div className='absolute top-28 left-24 text-white'>Home</div>
                </div>

                <div className='flex justify-center items-center h-16 '>
                    <div className='flex mr-8'>
                        <div className='bg-[#6b7385] rounded-3xl w-8 h-8 text-xl flex justify-center text-white mr-2'>1</div>
                        <div className='text-[#6b7385] text-xl'>Information</div>
                    </div>
                    <div className='flex'>
                        <div className='bg-[#5b5e95] rounded-3xl w-8 h-8 text-xl flex justify-center text-white mr-2'>2</div>
                        <div className='text-xl'>Conformation</div>
                    </div>
                </div>

                <div className='text-3xl flex justify-center mt-6'>Booking Conformation</div>
                <div className='flex justify-center text-[#6b7385]'>Booking confirmed. Contact support for changes/inquiries. Enjoy your Booking experience with us.</div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-white w-[780px] p-8 rounded-lg shadow-2xl m-8'>

                        <div className='text-2xl font-[500] mb-2'>
                            Booked Details
                        </div>
                        <hr className='mb-8'></hr>

                        <div className="flex flex-col text-lg">
                            <Detail label='Date' value={data.Date} />
                            <div className="flex justify-between max-w-[500px]">
                                <Detail label='Start Time' value={data.st_time} />
                                <Detail label='End Time' value={data.ed_time} />
                            </div>
                            <div className="flex justify-between max-w-[500px]">
                                <Detail label='No. of Participants' value={data.no_par} />
                                <Detail label='Maximum Capacity' value={data.max_cap} />
                            </div>
                            <Detail label='Venue' value={data.Venue} />
                            <Detail label='Description' value={data.Desc} />
                        </div>

                        <div className='flex justify-between mt-5'>
                            <button onClick={() => navigate('/book', {state: data})} type="button" class="flex items-center justify-center text-white mr-4 bg-[#504a61] hover:bg-[#6f6787] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"><IoArrowForwardCircleOutline className='mr-1 mt-[3px] size-[20px] stroke-1 rotate-180' />Back</button>
                            <button onClick={handleConfirm} type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full h-full sm:w-auto px-4 py-2.5 text-center">Confirm</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Conformation;
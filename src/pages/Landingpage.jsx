import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx'
import { UserContext } from '../../UserContext.jsx';

import myImage from '../assets/Image.png'
import Book from '../assets/Book.png'
import Venuepng from '../assets/Venuepng.svg'
import { MdOutlineLiveHelp } from "react-icons/md";

function Landingpage() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    return (
        <div className='h-screen'>
            <div className='bg-[#F5F6FA] min-w-[1200px]'>
                <Navbar username={userData.name} usermail={userData.email} />
                <div className='font-bold text-4xl mt-4 ml-[60px]'>Hi, {userData.name}</div>
                <div className='flex justify-center items-center mt-20'>
                    <div className='max-w-xl min-w-xl tracking-wide font-sans flex flex-col'>
                        <div className='text-[#4880ff] font-bold text-4xl'>Venue & Event booking Space</div>
                        <div className='font-bold text-6xl mt-4'>Experience Seamless Venue and Event Booking at your Fingertips......</div>
                        <div className='mt-5 text-sm'>The website is a one-stop platform for students to book venues and events on campus, simplifying the process and ensuring efficient utilization of resources.</div>
                        <Link to="/book">
                            <button type="button" className="text-[#2563eb] border-[2px] border-[#2563eb] bg-[#dbeafe] rounded-full py-2.5 text-center mt-5 size-1/5">Book Now</button>
                        </Link>
                    </div>
                    <div className='max-w-xl min-w-xl ml-5'>
                        <img src={myImage} alt='Image' className='min-w-12' />
                    </div>
                </div>
                <div>
                    <div className='flex justify-center font-bold text-6xl mt-12 text-[#1b4ab1] bg-gradient-to-r from-[#1b4ab1] via-[#7cafff] to-white text-opacity-0 bg-clip-text'>How It Works</div>
                    <div className='flex justify-center text-[#737373] text-3xl mt-5'>Simplifying the booking process for coaches, venues, and athletes.</div>
                    <div className='flex justify-evenly'>
                        <div className="flex flex-col items-center my-6 bg-white border rounded-xl shadow-2xl w-96 text-center p-5 py-7">
                            <div className='border bg-[#dbeafe] p-4 rounded-xl'><MdOutlineLiveHelp size="80px" color='#336ceb' strokeWidth={0} /></div>
                            <div className='font-bold text-lg'>Queries</div>
                            <div className='w-64'>Quick and Easy Registration: Get started on our software platform with a simple account creation process.</div>
                            <button type='submit' onClick={() => { navigate("/user/help") }} className="text-[#336ceb] border-[2px] border-[#336ceb] bg-[#dbeafe] rounded-lg py-2.5 text-center font-bold mt-5 size-3/5">Help</button>
                        </div>
                        <div className="flex flex-col items-center my-6 bg-white border-2 rounded-xl shadow-2xl w-96 text-center p-5 py-7">
                            <div className='border bg-[#dbeafe] p-4 rounded-xl '><img src={Venuepng} alt="" /></div>
                            <div className='font-bold text-lg'>Venues</div>
                            <div className='w-64'>Quick and Easy Registration: Get started on our software platform with a simple account creation process.</div>
                            <button type="button" onClick={() => { navigate("/uservenue") }} className="text-[#336ceb] border-[2px] border-[#336ceb] bg-[#dbeafe] rounded-lg py-2.5 text-center font-bold mt-5 size-3/5">Venues</button>
                        </div>
                        <div className="flex flex-col items-center my-6 bg-white border-2 rounded-xl shadow-2xl w-96 text-center p-5 py-7">
                            <div className='border bg-[#dbeafe] p-4 rounded-xl'><img src={Book} alt="" className='h-[82px]' /></div>
                            <div className='font-bold text-lg'>My Bookings</div>
                            <div className='w-64'>Quick and Easy Registration: Get started on our software platform with a simple account creation process.</div>
                            <button type="button" onClick={() => { navigate("/user/bookings") }} className="text-[#336ceb] border-[2px] border-[#336ceb] bg-[#dbeafe] rounded-lg py-2.5 text-center font-bold mt-5 size-3/5">History</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landingpage;
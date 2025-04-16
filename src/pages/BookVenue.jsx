import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/Navbar'
import { UserContext } from '../../UserContext.jsx'

import Titlebar from '../assets/Titlebar.png'
import { IoArrowForwardCircleOutline } from "react-icons/io5"

function BookVenue() {
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const data = location.state || {};
    const navigate = useNavigate();

    const [Venue, setVenue] = useState(data.Venue || '')
    const [Venuelocation, setVenuelocation] = useState(data.Venuelocation || '')
    const [st_time, setst_time] = useState(data.st_time || '')
    const [ed_time, seted_time] = useState(data.ed_time || '')
    const [BookingDate, setDate] = useState(data.BookingDate || '')
    const [no_par, setno_par] = useState(data.no_par || '')
    const [max_cap, setmax_cap] = useState(data.max_cap || '')
    const [Desc, setDesc] = useState(data.Desc || '')
    const [options, setoptions] = useState([])
    const [details, setdetails] = useState([])


    const setOptionsDetails = async () => {
        const response = await axios.get('http://localhost:8000/venues')
        const names = response.data.venues.map(venue => venue.name)
        setoptions(names)
    };

    const setDetail = async () => {
        const result = await axios.get('http://localhost:8000/bookings');
        setdetails(result.data.bookings.filter(booking => booking.Status === 'Approved'));
        
    };

    useEffect(() => {
        setDetail();
        setOptionsDetails();
    }, []);

    const fetchdata = async () => {
        const response = await axios.get('http://localhost:8000/venues')
        const selectedvenue = response.data.venues.find(venue => Venue === venue.name)
        if (selectedvenue) {
            setmax_cap(selectedvenue.capacity)
            setVenuelocation(selectedvenue.location)
        }
    };

    useEffect(() => {
        fetchdata()
    }, [Venue]);
    

    const CheckBooking = () => {
        const booking = details.filter(detail => new Date(detail.Booking_Date).toLocaleDateString() === new Date(BookingDate).toLocaleDateString() && detail.Venue_Name === Venue && ((detail.From_Time.slice(0, 5) >= st_time && detail.From_Time.slice(0, 5) < ed_time) || (detail.To_Time.slice(0, 5) >st_time && detail.To_Time.slice(0, 5) < ed_time)))
        console.log(BookingDate);
        
        
        if(booking.length > 0){
            alert('Venue is already booked for the selected date and time')
        }
        else{
            navigate('/conformation', { state: { BookingDate, st_time, ed_time, Venue, Venuelocation, no_par, max_cap, Desc } })
        }
    }

    return (
        <div>
            <div className='bg-[#F5F6FA] min-h-screen'>
                <Navbar />
                <div className='relative'>
                    <div className="absolute inset-0 bg-black-600/50 backdrop-blur-sm z-10"></div>
                    <img src={Titlebar} alt="" className='w-full h-[250px] object-cover' />
                    <div className='z-50 flex justify-center absolute top-[90px] text-white font-bold text-4xl left-20'>Book Venue</div>
                    <div className='absolute z-50 top-[130px] left-20 text-white'>Home &gt; Booking</div>
                </div>

                <div className='flex justify-center items-center h-16 '>
                    <div className='flex mr-8'>
                        <div className='bg-[#5b5e95] rounded-3xl w-8 h-8 text-xl flex justify-center text-white mr-2'>1</div>
                        <div className=' text-xl'>Information</div>
                    </div>
                    <div className='flex'>
                        <div className='bg-[#6b7385] rounded-3xl w-8 h-8 text-xl flex justify-center text-white mr-2'>2</div>
                        <div className='text-[#6b7385] text-xl'>Conformation</div>
                    </div>
                </div>

                <div className='text-3xl flex justify-center mt-6'>Select A venue</div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-white w-[780px] p-8 rounded-lg shadow-2xl m-8'>

                        <form onSubmit={(e) => { e.preventDefault(); CheckBooking()}}>
                            <div>
                                <div className='text-2xl font-[500] mb-2'>
                                    Booking Form
                                </div>
                                <hr className='mb-8'></hr>
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-date font-medium text-gray-900">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={BookingDate}
                                        className="bg-gray-50 placeholder-red-50::placeholder border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-[345px]'>
                                        <label htmlFor="st_time" className="block mb-2 mt-4 text-base font-medium text-gray-900">Start time</label>
                                        <input
                                            type="time"
                                            id="st_time"
                                            value={st_time}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                            onChange={(e) => setst_time(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='w-[345px]'>
                                        <label htmlFor="ed-time" className="block mb-2 mt-4 text-base font-medium text-gray-900">End Time</label>
                                        <input
                                            type="time"
                                            id="ed-time"
                                            value={ed_time}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                            onChange={(e) => seted_time(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="venue" className="block mb-2 mt-4 text-base font-medium text-gray-900">Venue</label>
                                    <select
                                        type="text"
                                        id="venue"
                                        value={Venue}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                        onChange={(e) => setVenue(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled default>
                                            Select Venue
                                        </option>
                                        {options &&
                                            options.map(element => (
                                                <option key={element} value={element}>{element}</option>
                                            ))
                                        }
                                    </select>
                                    <div >
                                        <label htmlFor="capacity" className="block mb-2 mt-4 text-base font-medium text-gray-900">Location</label>
                                        <input
                                            type="text"
                                            id="capacity"
                                            placeholder='Location'
                                            value={Venuelocation}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-default focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='w-[345px]'>
                                            <label htmlFor="capacity" className="block mb-2 mt-4 text-base font-medium text-gray-900">No. of Participants</label>
                                            <input
                                                type="number"
                                                id="participants"
                                                placeholder='Enter the no. of Participants'
                                                value={no_par}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none focus:border-[#1a73e8] focus:shadow-md"
                                                onChange={(e) => setno_par(e.target.value)}
                                                required
                                                min='1'
                                                max={max_cap}
                                            />
                                        </div>

                                        <div className='w-[345px]'>
                                            <label htmlFor="capacity" className="block mb-2 mt-4 text-base font-medium text-gray-900">Maximum Capacity</label>
                                            <input
                                                type="number"
                                                id="capacity"
                                                placeholder='Maximum Capacity'
                                                value={max_cap}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 cursor-default focus:outline-none"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="venue" className="block mb-2 mt-4 text-base font-medium text-gray-900">Event Description</label>
                                    <textarea
                                        placeholder='Enter Event Description'
                                        value={Desc}
                                        className='bg-[#f9fafb] overflow-hidden resize-none border rounded-lg w-full h-[130px] border-[#d1d5db] p-3 focus:outline-none focus:border-[#1a73e8] focus:shadow-md'
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                    <div className='flex justify-end text-sm text-gray-500'>Maximum 500 characters</div>
                                </div>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <button type="button" onClick={() => navigate("/home")} className="flex items-center justify-center text-white mr-4 bg-[#504a61] hover:bg-[#6f6787] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"><IoArrowForwardCircleOutline className='mr-1 mt-[3px] size-[20px] stroke-1 rotate-180' />Back</button>

                                <button
                                    type="submit"
                                    className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"
                                    onSubmit={() => navigate('/conformation', { state: { BookingDate, st_time, ed_time, Venue, Venuelocation, no_par, max_cap, Desc } })}
                                >
                                    Next<IoArrowForwardCircleOutline className='ml-1 mt-[3px] size-[20px] stroke-1' />
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BookVenue
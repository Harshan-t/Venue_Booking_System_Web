import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineLiveHelp } from "react-icons/md";

import '../styles/UserNavbar.css';

function UserNavbar({ username, usermail }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setactive] = useState(location.pathname);

    useEffect(() => {
        setactive(location.pathname);
    }, [location])

    return (
        <div>
            <div className="flex justify-center mt-7">
                <div
                    type="button"
                    onClick={() => navigate('/user/dashboard', { state: { name: username, email: usermail } })}
                    className={`flex flex-col justify-center items-center text-[20px] font-medium rounded-xl shadow-lg min-w-44 h-32 p-4 mr-[50px] cursor-pointer  ${active === '/user/dashboard' ? `bg-[#999bbe] text-white` : `bg-white hover:bg-[#cbccee] hover:text-white`}`}
                >
                    <MdOutlineDashboardCustomize className="size-[28px]" />
                    Dashboard
                </div>
                <div
                    onClick={() => navigate('/user/bookings', { state: { name: username, email: usermail } })}
                    className={`flex flex-col justify-center items-center text-[20px] font-medium rounded-xl shadow-lg min-w-44 h-32 p-4 mr-[50px] cursor-pointer ${active === '/user/bookings' ? `bg-[#999bbe] text-white` : ` bg-white hover:bg-[#cbccee] hover:text-white`}`}
                >
                    <FaRegCalendarAlt className="size-[24px]" />
                    My bookings
                </div>
                <div
                    onClick={() => navigate('/user/help', { state: { name: username, email: usermail } })}
                    className={`flex flex-col justify-center items-center text-[20px] font-medium rounded-xl shadow-lg min-w-44 h-32 p-4 mr-[50px] cursor-pointer ${active === '/user/help' ? `bg-[#999bbe] text-white` : ` bg-white hover:bg-[#cbccee] hover:text-white`}`}
                >
                    <MdOutlineLiveHelp className="size-[25px]" />
                    Help
                </div>
            </div>
        </div>
    )
}

export default UserNavbar;
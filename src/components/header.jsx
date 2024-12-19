import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { UserContext } from "../../UserContext.jsx";

import Logo from "../assets/Logo.png";

function Header() {
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const popoverRef = useRef(null);
    const { userData } = useContext(UserContext);

    const togglePopover = () => {
        setPopoverVisible((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setPopoverVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 shadow-md py-4 px-2 bg-white z-10">
            <nav className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>

                <div className="flex items-center space-x-4 relative">
                    <div
                        className="relative"
                        onMouseEnter={() => setPopoverVisible(true)}
                        onMouseLeave={() => setPopoverVisible(false)}
                        onClick={togglePopover} 
                    >
                        <img
                            src="src/assets/user.jpg"
                            className="h-10 w-10 rounded-full border border-gray-300 cursor-pointer"
                            alt="avatar"
                        />

                        {isPopoverVisible && (
                            <div
                                ref={popoverRef}
                                className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-20"
                            >
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <img
                                            src="src/assets/user.jpg"
                                            className="w-10 h-10 rounded-full mr-3"
                                            alt="User Avatar"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {userData.name}
                                            </p>
                                            <p className="text-xs text-gray-500">@{userData.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-2">
                                        One of the admin of venue booking team{" "}
                                        <a
                                            href="https://booknow.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            booknow.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                   
                </div>
            </nav>
        </header>
    );
}

export default Header;

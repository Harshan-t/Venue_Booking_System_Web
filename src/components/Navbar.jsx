import '../styles/Navbar.css';
import mylogo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div>
            <div className="bg-[#dee8f2] flex justify-between p-10 min-w-[950px] relative">
                <div className="min-w-48">
                    <img src={mylogo} alt="logo" />
                </div>
                <div className="space-x-7 flex items-center">
                    <button onClick={() => navigate('/home')}>Home</button>
                    <button onClick={() => navigate('/uservenue')}>Venue</button>
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2"
                        >
                            Profile
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-40 bg-white border-[2px] border-gray-300 rounded-lg shadow-lg z-50"
                                onMouseLeave={closeDropdown}
                            >
                                <ul>
                                    <li>
                                        <button
                                            onClick={() => {
                                                navigate('/user/dashboard');
                                                closeDropdown();
                                            }}
                                            className="block px-4 py-2 w-full text-left hover:bg-gray-100 rounded-t-lg"
                                        >
                                            Dashboard
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                navigate('/user/bookings');
                                                closeDropdown();
                                            }}
                                            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                        >
                                            My Bookings
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                navigate('/user/help');
                                                closeDropdown();
                                            }}
                                            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                        >
                                            Help
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            onClick={() => {
                                                navigate('/login');
                                                closeDropdown();
                                            }}
                                            className="block px-4 py-2 w-full border-t text-left hover:bg-gray-100 rounded-b-lg"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

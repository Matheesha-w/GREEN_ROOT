import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // chekc the authToken is present
    useEffect(() => {
        const token = Cookies.get("authToken");
        setIsAuthenticated(!!token);
    }, []);

    // logout function
    const handleLogout = () => {
        // remove token from cookies
        Cookies.remove("authToken");
        setIsAuthenticated(false);
        navigate("/");
    };


    return (
        <>
            <nav className="bg-white border-b shadow-md rounded-3xl mx-2.5 sticky top-0.5 z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                            GreenRoot
                        </span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3">
                        {/* User Menu Button */}
                        <button
                            type="button"
                            className="flex text-sm bg-green-900 rounded-full focus:ring-4 focus:ring-green-400"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="/docs/images/people/profile-picture-3.jpg"
                                alt="User"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">Bonnie Green</span>
                                    <span className="block text-sm text-gray-500">name@greenroot.com</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                                        >
                                            Earnings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                                        >
                                            <button onClick={handleLogout}> Sign out</button>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setNavOpen(!navOpen)}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navbar Links */}
                    <div
                        className={`items-center justify-between ${navOpen ? "block" : "hidden"
                            } w-full md:flex md:w-auto md:order-1`}
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-green-500 rounded-lg bg-green-600 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                            <li>
                                <Link
                                    to={`/`}
                                    className="block py-2 px-3 text-black bg-green-800 rounded-sm md:bg-transparent  md:p-0 md:hover:text-green-600"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#aboutHome"
                                    className="block py-2 px-3 text-black rounded-sm hover:bg-green-600 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#serviceHome"
                                    className="block py-2 px-3 text-black rounded-sm hover:bg-green-600 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#blogsHome"
                                    className="block py-2 px-3 text-black rounded-sm hover:bg-green-600 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                                >
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <Link
                                    to={`/contact`}
                                    className="block py-2 px-3 text-black rounded-sm hover:bg-green-600 md:hover:bg-transparent md:hover:text-green-600 md:p-0"
                                >
                                    Contact
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <li>

                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                        onClick={handleLogout}>Logout
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li>

                                        <Link to={`/auth/login`} className="block py-2 px-3 text-black rounded-sm hover:bg-green-500 md:hover:bg-transparent md:hover:text-green-300 md:p-0">Login</Link>
                                    </li>
                                    <li>
                                        <Link to={`/auth/register`} className="block py-2 px-3 text-black rounded-sm hover:bg-green-600 md:hover:bg-transparent md:hover:text-green-600 md:p-0">Sign Up</Link>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
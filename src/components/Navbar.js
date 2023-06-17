import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../logo.jpeg'

const Navbar = () => {
    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload()
        navigate("/login")
        alert("You really want to Logout?")
    }

    return (
        <>
            <nav className="border-gray-200 bg-black shadow-sm shadow-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">iNoteBook</span>
                    </Link>

                    {!localStorage.getItem('token') ? <div className="flex md:order-1">
                        <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 bg-transparent text-blue-500" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div> : ""}

                    {!localStorage.getItem('token') ? <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 md:mt-0 md:border-0 text-white">
                            <li>
                                <Link to="/" className="block hover:text-red-600 focus:text-red-500 py-2 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-red-500" aria-current="page">HOME</Link>
                            </li>
                            <li>
                                <Link to="/About" className="block hover:text-red-600 focus:text-red-500 py-2 pl-3 md:pl-0 text-white rounded md:hover:bg-transparent md:hover:text-red-500">ABOUT</Link>
                            </li>
                            <li>
                                <Link to="/login" className="block my-2 md:my-0 bg-blue-700 hover:bg-blue-600 py-2 pl-3 pr-4 text-white rounded-lg md:px-4 md:p-2" aria-current="page">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="block my-2 md:my-0  bg-blue-700 hover:bg-blue-600 py-2 pl-3 pr-4 text-white rounded-lg md:px-4 md:p-2">SignUp</Link>
                            </li>
                        </ul>
                    </div> : <div className="items-center justify-between  md:flex md:order-2 space-x-4 ">

                        <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={logo} alt="User dropdown" />

                        <div id="userDropdown" className="z-10 hidden divide-y rounded-lg shadow w-44 bg-gray-700 divide-gray-600">
                            <div className="px-4 py-3 text-sm text-white">
                                <div>kalash vasaniya</div>
                                <div className="font-medium truncate">kalash@gmail.com</div>
                            </div>
                            <div className="py-1">
                                <button onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200">Logout</button>
                            </div>
                        </div>

                    </div>
                    }

                </div>
            </nav>


        </>
    )
}

export default Navbar

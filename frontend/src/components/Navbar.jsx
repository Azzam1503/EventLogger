import React from 'react'
import {  Link, NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios";
import ThemeToggle from './ThemeToggle';

const Navbar = (props) => {

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    let isLoggedIn = props.isLoggedIn
    let setIsLoggedIn = props.setIsLoggedIn
    const check = () => {
        console.log(isLoggedIn);
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post("https://eventlogger.onrender.com/user/logout", {},{
                withCredentials: true
            });
            console.log(response);
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <div className='bg-[#161d29] dark:bg-[#343d68] py-3'>
      <div className='text-white w-11/12 max-w-maxContent mx-auto flex justify-between items-center gap-3'>
        <Link to="/">
            <div className='flex items-center gap-1'>
                    <p className='bg-[#f9f9f9] text-richblack-700 rounded-full w-[32px] text-center font-[700] text-[24px] leading-[32px]'>E</p>
                    <p className='text-[#dadbdc] font-[600] text-[28px] leading-[36px]'>Event Logger</p>
            </div>
        </Link>

        <nav>
                    <ul className='text-richblack-25 text-[16px] font-inter font-[530] leading-[24px] flex gap-x-6 '> 

                        <li className='hover:text-yellow-25 hover:dark:text-[#e84949]'>
                            <NavLink to={"/"}>Home </NavLink>
                        </li>

                        <li className='hover:text-yellow-25 hover:dark:text-[#e84949]'>
                            <NavLink to={"/events"}>All Events</NavLink>
                        </li>

                        <li className='hover:text-yellow-25 hover:dark:text-[#e84949]'>
                            <NavLink to={"/create-event"}>Create</NavLink>
                        </li>
                        <li>
                           <ThemeToggle/>
                        </li>

                    </ul>
            </nav>

            <div className='flex space-x-6'>

                <div className='text-[#dbddea] flax space-x-6'>
                { !isLoggedIn &&
                    <Link to="/login">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                 dark:bg-[#e84949] dark:text-richblack-5'>
                            Login
                        </button>
                    </Link>
                }
                { !isLoggedIn &&
                    <Link to="/register">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                dark:bg-[#e84949] dark:text-richblack-5'>
                            Signup
                        </button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/user-profile">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                 dark:bg-[#e84949] dark:text-richblack-5'>
                            Dashboard
                        </button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/">
                        <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                                   dark:bg-[#e84949] dark:text-richblack-5'
                                onClick={ () => {
                                    handleLogout();
                                    toast.success("Logged Out")
                                }}
                        > 
                            Log Out
                        </button>
                    </Link>
                }
                
            </div>

            </div>
      </div>
    </div>
  )
}

export default Navbar

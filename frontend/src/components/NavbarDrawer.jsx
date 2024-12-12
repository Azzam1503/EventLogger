
"use client";
import { NavLink, useLocation,Link } from 'react-router-dom'
import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast'
import axios from "axios";
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export const NavbarDrawer = () =>  {
  const {user, setUser} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleClose = () => setIsOpen(false);

  console.log("router", location?.pathname)


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
}

let isLoggedIn = user !== null;

const handleLogout = async () => {
    try {
        const response = await axios.post("http://localhost:3000/user/logout", {}, {
            withCredentials: true
        });
        console.log(response);
        setUser(null);
        localStorage.removeItem("user");
    } catch (error) {
        console.log(error)
    }
};

  return (
    <>
      <div className="flex items-center md:hidden justify-center">
        <Button onClick={() => setIsOpen(true)}><GiHamburgerMenu className="text-3xl w-5 h-5" /></Button>
      </div>
      <Drawer className="bg-[#161d29]" open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Event Logger" />
        <Drawer.Items>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Supercharge your hiring by taking advantage of our&nbsp;
            <a href="#" className="text-cyan-600 underline hover:no-underline dark:text-cyan-500">
              limited-time sale
            </a>
            &nbsp;for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
            job board.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <nav>
              <ul className='flex flex-col w-full gap-5 text-richblack-25 text-[16px] font-inter font-[530] leading-[24px] gap-x-6 '>

                <li className={` ${location?.pathname === "/" ? "bg-pink-600 " : ""} p-2 rounded-md w-full text-white hover:dark:bg-[#e84949]`}>
                  <NavLink className={`w-full`} to={"/"}>Home </NavLink>
                </li>

                <li className={` hover:dark:text-[#e84949] ${location?.pathname === "/events" ? "bg-pink-600" : ""} p-2 text-white rounded-md w-full`}>
                  <NavLink to={"/events"}>All Events</NavLink>
                </li>

                <li className={` hover:dark:text-[#e84949] ${location?.pathname === "/create-event" ? "bg-pink-600" : ""} p-2 text-white rounded-md w-full`}>
                  <NavLink to={"/create-event"}>Create</NavLink>
                </li>
                <li>
                  <ThemeToggle />
                </li>

              </ul>
            </nav>
          </div>

          <div className=' space-x-6 flex'>

            <div className='text-[#dbddea] flax space-x-6'>
              {!isLoggedIn &&
                <Link to="/login">
                  <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
             dark:bg-[#e84949] dark:text-richblack-5'>
                    Login
                  </button>
                </Link>
              }
              {!isLoggedIn &&
                <Link to="/register">
                  <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
            dark:bg-[#e84949] dark:text-richblack-5'>
                    Signup
                  </button>
                </Link>
              }
              {isLoggedIn &&
                <Link to="/user-profile">
                  <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
             dark:bg-[#e84949] dark:text-richblack-5'>
                    Dashboard
                  </button>
                </Link>
              }
              {isLoggedIn &&
                <Link to="/">
                  <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
               dark:bg-[#e84949] dark:text-richblack-5'
                    onClick={() => {
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
        </Drawer.Items>
      </Drawer>
    </>
  );
}

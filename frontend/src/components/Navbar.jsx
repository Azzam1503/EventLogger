import React from 'react'
import {  Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios";

const Navbar = (props) => {

    let isLoggedIn = props.isLoggedIn
    let setIsLoggedIn = props.setIsLoggedIn
    const check = () => {
        console.log(isLoggedIn);
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/user/logout", {},{
                withCredentials: true
            });
            console.log(response);
            setIsLoggedIn(false);
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <div className='bg-[#161d29] py-3'>
      <div className='text-white w-11/12 max-w-maxContent mx-auto flex justify-between items-center gap-3'>
        <Link to="/">
            <div className='flex items-center gap-1'>
                    <p className='bg-richblack-25 text-black rounded-full w-[32px] text-center font-[600] text-[24px] leading-[32px]'>E</p>
                    <p className='text-white font-[600] text-[28px] leading-[36px]'>EventLogger</p>
            </div>
        </Link>

        <nav>
                    <ul className='text-white flex gap-x-6'> 

                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>

                        <li>
                            <Link to={"/"}>About</Link>
                        </li>

                        <li>
                            <Link to={"/contact"}>Contact Us</Link>
                        </li>

                    </ul>
            </nav>

            <div className='flex space-x-6'>

                <div className='text-white flax space-x-6'>
                { !isLoggedIn &&
                    <Link to="/login">
                        <button className='bg-richblack-800 border border-[#2c333f] px-3 py-1 rounded-[8px]'>
                            Login
                        </button>
                    </Link>
                }
                { !isLoggedIn &&
                    <Link to="/register">
                        <button className='bg-richblack-800 border border-[#2c333f] px-3 py-1 rounded-[8px]'>
                            Signup
                        </button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/Dashboard">
                        <button className='bg-richblack-800 border border-[#2c333f] px-3 py-1 rounded-[8px] '>
                            Dashboard
                        </button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to="/">
                        <button className='bg-richblack-800 border border-[#2c333f] px-3 py-1 rounded-[8px]'
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

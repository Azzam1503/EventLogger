import React from 'react'
import {Link } from 'react-router-dom'
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <>
      <div className='bg-richblack-800 lg:h-[358px] relative dark:bg-[#343d68]'>

         <div className='absolute text-richblack-700 select-none mt-[195px]'>
            <p className='text-[100px] dark:text-[#535c87]'>Mjpru Bareilly</p>
         </div>

          <div className='w-11/12 max-w-maxContent mx-auto flex justify-between items-center gap-6 mt-10 py-16 border-b lg:border-richblack-600'>

                  {/* section 1 */}
                  <div className='flex gap-8 text-richblack-100 text-[16px] botder lg:border-richblack-700 dark:text-white'>
                     <div className='hover:text-[#e84949]'>
                        <Link to="/">Home</Link>
                     </div>
                     <div className='hover:text-[#e84949]'>
                        <Link>All Events</Link>
                     </div>
                     <div className='hover:text-[#e84949]'>
                        <Link>Create Event</Link>
                     </div>
                    
                  </div>

                  {/* section 2 */}
                  <div className='flex gap-8 text-[28px] leading-[36px] font-[600] text-richblack-200 dark:text-white'>
                    <div className='hover:text-[#e84949]'>
                       <FaLinkedinIn />
                    </div>
                    <div className='hover:text-[#e84949]' >
                       <FaGithub />
                    </div>
                    <div className='hover:text-[#e84949]'>
                       <FaTwitter />
                    </div>
                    <div className='hover:text-[#e84949]'>
                        <RiInstagramFill />
                     </div>
                  </div>
                  
                
          </div>
        
          <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400
               dark:text-white mx-auto  pb-14 mt-10 text-sm">
            {/* Section 1 */}
            <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
              <div className="flex flex-row">
                {BottomFooter.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className={` ${
                        BottomFooter.length - 1 === i
                          ? ""
                          : "border-r border-richblack-600 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      } px-3 `}
                    >
                      <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="text-center dark:text-white">Made with ❤️ Vivek Gupta & Azzam Uddin © 2024 EventLogger</div>

            </div>
      </div>
             <p className='w-11/12 lg:w-full mx-auto pl-[800px] text-richblack-700 text-[32px]  leading-[40px] font-[600]
                select-none dark:text-[#535c87]'>Supervisor - Prof V Rishiwal © 2024 EventLogger</p> 

       </div>
      
    </>
  )
}

export default Footer

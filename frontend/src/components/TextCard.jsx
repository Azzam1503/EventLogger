import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const card = [
    {
        // title:"June-2002 - 2020",
        image:"https://i.ibb.co/pW3PGBQ/1608821216607.jpg",
        heading:"Prof V RISHIWAL",
        title1:"Supervisor-© 2024 EventLogger",
        description:"There are many variations of passages of Lorem Ipsumav ailable, but the majority have suffered alteration in some",
    },
    {
        // title:"June-2002 - 2020",
        image:"https://i.ibb.co/bX3ph3h/IMG-20230319-011945-017.jpg",
        heading:"VIVEK GUPTA",
        title1:"Full Stack Web Developer",
        description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
        // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
    },
    {
        // title:"June-2002 - 2020",
        image:"https://i.ibb.co/SdpKn8D/azzaamimg.jpg",
        heading:"AZZAM UDDIN",
        title1:"Full Stack Web Developer",
        description:"There are many variations of passages of Lorem Ipsumav ailable, but the majority have suffered alteration in some11",
    },
    {
        // title:"June-2002 - 2020",
        image:"https://i.ibb.co/QKWcDsb/jp.jpg",
        heading:"Jay PRATAP SINGH",
        title1:"Front End Developer",
        description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
        // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
    },
    {
        // title:"June-2002 - 2020",
        image:"https://i.ibb.co/3sGQwKQ/kapil.jpg",
        heading:"KAPIL GUPTA",
        title1:"Front End Developer",
        description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
        // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
    },
]

const TextCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col mt-[30px] mb-[100px]'>

        <div className='w-[1126px] pl-[90px] mt-[60px] '>
                <div className='text-[#f3f4f6] mx-auto rounded-lg'>
                  <Slider {...settings}>
                      {
                          card.map((data, index) => {  
                              return (
                                  <div key={index} className='bg-[#111827] h-[385px] p-[30px] rounded-[12px] flex flex-col justify-center items-center
                                          dark:bg-[white]/40 dark:backdrop-blur-md dark:shadow-xl'>
                                      <div className='flex justify-center items-center'>
                                        <img src={data.image} alt="" className='w-[130px] rounded-full h-[130px]' />
                                      </div>
                                      {/* <p className='text-[#d1d5db] text-[20px] font-[400] leading-[27px]'>{data.title}</p> */}
                                      <h1 className='text-[26px] font-[700] leading-[41px] text-yellow-500 pt-[10px] flex justify-center items-center'>{data.heading}</h1>
                                      <p className='text-blue-300 font-[400] text-[16px] leading-[27px] flex justify-center items-center'>{data.title1}</p>
                                      <p className='text-[#6b7280] font-[400] text-[16px] leading-[27px] text-center pt-[10px]'>{data.description}</p>
                                  </div>
                              )
                          })
                      }
                  </Slider>
                </div>
        </div>
    </div>
</>
  )
}

export default TextCard

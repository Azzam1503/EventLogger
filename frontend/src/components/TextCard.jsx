import React, { useEffect, useRef } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";



const TextCard = () => {

    const navRef = useRef(null);

    const handleNav = (direction) => {
        if (navRef.current) {
            const scrollAmount = direction === "left" ? -344 : 344;
            navRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };


    const card = [
        {
            // title:"June-2002 - 2020",
            image: "https://i.ibb.co/pW3PGBQ/1608821216607.jpg",
            heading: "Prof V RISHIWAL",
            title1: "Supervisor-© 2024 EventLogger",
            description: "There are many variations of passages of Lorem Ipsumav ailable, but the majority have suffered alteration in some",
        },
        {
            // title:"June-2002 - 2020",
            image: "https://i.ibb.co/SdpKn8D/azzaamimg.jpg",
            heading: "AZZAM UDDIN",
            title1: "Full Stack Web Developer",
            description: "Hello! My name is Azzam Uddin and I a full stack developer and I have build this website from scratch",
        },
        {
            // title:"June-2002 - 2020",
            image: "https://ibb.co/BfwB17B",
            heading: "VIVEK GUPTA",
            title1: "Full Stack Web Developer",
            description: "Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
            // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
        }
    ]
    return (
        <>
            <div
                id="reviews"
                className="w-full bg-brandBlue-100 md:py-20 py-16 flex flex-col gap-3 items-center"
            >

                <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                    ref={navRef}
                    className="w-full max-w-5xl flex gap-6 overflow-x-auto no-scrollbar sm:px-5 px-4 ease-in-out transition"
                >
                    {card?.map((item, index) => (
                        <div
                            className="flex w-full min-w-[314px] justify-between h-[370px] rounded-lg items-center flex-col gap-6 p-5 bg-[#111827] dark:bg-white"
                            key={index}
                        >

                            <div className={`relative w-36 h-36 rounded-full`}>
                                <img

                                    alt="img"
                                    src={item?.image}
                                    className={`rounded-full w-full h-full`}

                                />
                            </div>
                            <div className="flex flex-col w-full gap-5">
                                <div className="border-b w-full border-richblack-500"></div>
                                <div className="flex gap-4 items-center w-full">

                                    <div className="text-white dark:text-black">
                                        <h2 className="text-yellow-400 text-xl font-bold">{item?.heading}</h2>
                                        <h1>{item?.title1}</h1>
                                    </div>
                                </div>
                                <p className="text-[#6b7280] text-sm line-clamp-6 mt-1 pb-2">
                                    {item?.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="text-white flex gap-3 pt-6">
                    <button className=" " onClick={() => handleNav("left")}>
                       <IoIosArrowDropleftCircle className="text-3xl dark:text-blue-500 dark:hover:text-[#e84949] hover:text-blue-500 duration-150"/>
                    
                    </button>
                    <button onClick={() => handleNav("right")}>
                    <IoIosArrowDroprightCircle className="text-3xl dark:text-blue-500 dark:hover:text-[#e84949] hover:text-blue-500 duration-150"/>
                    
                    </button>
                </div>
            </div>
        </>
    );
};

export default TextCard;




// const card = [
//     {
//         // title:"June-2002 - 2020",
//         image:"https://i.ibb.co/pW3PGBQ/1608821216607.jpg",
//         heading:"Prof V RISHIWAL",
//         title1:"Supervisor-© 2024 EventLogger",
//         description:"There are many variations of passages of Lorem Ipsumav ailable, but the majority have suffered alteration in some",
//     },
//     {
//         // title:"June-2002 - 2020",
//         image:"https://i.ibb.co/bX3ph3h/IMG-20230319-011945-017.jpg",
//         heading:"VIVEK GUPTA",
//         title1:"Full Stack Web Developer",
//         description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
//         // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
//     },
//     {
//         // title:"June-2002 - 2020",
//         image:"https://i.ibb.co/SdpKn8D/azzaamimg.jpg",
//         heading:"AZZAM UDDIN",
//         title1:"Full Stack Web Developer",
//         description:"There are many variations of passages of Lorem Ipsumav ailable, but the majority have suffered alteration in some11",
//     },
//     {
//         // title:"June-2002 - 2020",
//         image:"https://i.ibb.co/QKWcDsb/jp.jpg",
//         heading:"Jay PRATAP SINGH",
//         title1:"Front End Developer",
//         description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
//         // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
//     },
//     {
//         // title:"June-2002 - 2020",
//         image:"https://i.ibb.co/3sGQwKQ/kapil.jpg",
//         heading:"KAPIL GUPTA",
//         title1:"Front End Developer",
//         description:"Hi Everyone My name is Vivek Gupta I am a Full Stack Web Developer Currently I am working on React and Making Beautiful UI-UX are my fey features"
//         // description:"I Am A B-Tech 4th year computer science student it Rohilkhand University Bareilly currently reading the essay in CP and learning web development.!!",
//     },
// ]

// const TextCard = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1
//   };

//   return (
//     <>
//     <div className='w-full max-w-maxContent items-center mx-auto flex flex-col mt-[30px] mb-[100px]'>

//         <div className='xl:w-[1126px] lg:w-[856px] w-full md:w-[650px] sm:w-[550px] mt-[60px] '>
//                 <div className='text-[#f3f4f6] mx-auto rounded-lg w-full'>
//                   <Slider {...settings}>
//                       {
//                           card.map((data, index) => {
//                               return (
//                                   <div key={index} className='bg-[#111827] h-[385px] w-[250px] p-[30px] rounded-[12px] flex flex-col justify-center items-center
//                                           dark:bg-[white]/40 dark:backdrop-blur-md dark:shadow-xl'>
//                                       <div className='flex justify-center items-center'>
//                                         <img src={data.image} alt="" className='w-[130px] rounded-full h-[130px]' />
//                                       </div>
//                                       {/* <p className='text-[#d1d5db] text-[20px] font-[400] leading-[27px]'>{data.title}</p> */}
//                                       <h1 className='text-[26px] font-[700] leading-[41px] text-yellow-500 pt-[10px] flex justify-center items-center'>{data.heading}</h1>
//                                       <p className='text-blue-300 font-[400] text-[16px] leading-[27px] flex justify-center items-center'>{data.title1}</p>
//                                       <p className='text-[#6b7280] font-[400] text-[16px] leading-[27px] text-center pt-[10px]'>{data.description}</p>
//                                   </div>
//                               )
//                           })
//                       }
//                   </Slider>
//                 </div>
//         </div>
//     </div>
// </>
//   )
// }

// export default TextCard

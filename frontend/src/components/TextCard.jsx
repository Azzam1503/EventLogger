import React from 'react'

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
    }
]

const TextCard = () => {
  return (
    <>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col mt-[30px] mb-[100px]'>

        <div className='w-[1126px] pl-[90px] mt-[60px] '>
                <div className='text-[#f3f4f6] mx-auto w-[360px] h-[330px] grid  xl:w-fit grid-cols-1 xl:grid-cols-3 gap-8 rounded-lg '>
                    {
                        card.map((data, index) => {  
                            return (
                                <div key={index} className='bg-[#111827] h-[365px] p-[30px] rounded-[12px] flex flex-col justify-center items-center'>
                                {/* <img src={userPhoto} alt="" className='w-[130px] rounded-full h-[130px]' /> */}
                                    <img src={data.image} alt="" className='w-[130px] rounded-full h-[130px]' />
                                    {/* <p className='text-[#d1d5db] text-[20px] font-[400] leading-[27px]'>{data.title}</p> */}
                                    <h1 className='text-[26px] font-[700] leading-[41px] text-yellow-500 pt-[10px]'>{data.heading}</h1>
                                    <p className='text-blue-300 font-[400] text-[16px] leading-[27px]'>{data.title1}</p>
                                    <p className='text-[#6b7280] font-[400] text-[16px] leading-[27px] text-center pt-[10px]'>{data.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    </div>
</>
  )
}

export default TextCard

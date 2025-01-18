import React, { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import gsap from 'gsap';

const CaptainRiding = () => {
    const [FinishRidePanel,setFinishRidePanel]=useState(false);
    const FinishRideRef=useRef(null);
    useLayoutEffect(() => {
        if (FinishRideRef.current) {
          gsap.to(FinishRideRef.current, {
            y: FinishRidePanel ? 0 : '100%', // Slide in or out
            duration: 0.5, // Animation duration
          });
        }
      }, [FinishRidePanel]);
  return (
    <div className="h-screen">
           
      
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to={'/home'}
          className="fixed h-10 w-10 shadow-md shadow-black bg-white flex items-center justify-center rounded-full right-2 top-2"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

 
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background Animation"
        />
      </div>
      <div onClick={
        ()=>{
            setFinishRidePanel(true)
        }
      } className="h-1/5 p-6 flex relative justify-between items-center bg-yellow-400">
      <h5  className='p-3 text-center w-[90%] top-0    absolute' > <i className='ri-arrow-up-wide-line text-3xl text-black'></i></h5>
        <h4 className='text-2xl font-semibold '>4 KM away </h4>
        <button className='bg-green-400 text-white font-semibold p-3 px-10 rounded-lg '>Complete Ride</button>
      </div>
      <div ref={FinishRideRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>

    </div>
  );
  
}

export default CaptainRiding
import React from 'react';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel'; // Ensure this path is correct
import VehiclePanel from '../components/VehiclePanel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vechilePanelRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useLayoutEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 20
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0
        ,
        padding: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen]);

  useLayoutEffect(() => {

    if (vehiclePanel) {
      gsap.to(vechilePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      });
    } else {
      gsap.to(vechilePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      });
    }
  }, [vehiclePanel]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen' >
        {/* temporary use image  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' top-0 flex flex-col justify-end  absolute  w-full  h-screen '>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className=' opacity-0 absolute top-5 right-5 text-2xl font-semibold text-gray-500'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold p-5'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e);
          }} >
            {/* <div className="circle h-3 w-3 rounded-full absolute top-[45%] left-[8.5%] bg-gray-900 "></div>
            <div className="circle h-3 w-3  absolute top-[65%] left-[8.5%] bg-gray-900 ">

            </div>
            <div className="line absolute h-10 w-1 top-[50%] left-10 bg-gray-900 rounded-full"></div> */}
            <input onClick={() => {
              setPanelOpen(true)
            }} value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }} className='bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3 ' type="text" placeholder='Add a pick up location' />
            <input onClick={() => {
              setPanelOpen(true)
            }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }} className='bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>
        <div ref={panelRef} className='h-0  opacity-0 bg-white '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
          {/* Uncommented component */}
        </div>
      </div>
      <div ref={vechilePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 w-full'>
      <VehiclePanel setVehiclePanel={setVehiclePanel}/>
      </div >
    </div>
  );
};

export default Home;
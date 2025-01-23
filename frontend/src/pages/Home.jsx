import React, { useState, useRef } from 'react';
import { useLayoutEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookinForDriver from '../components/LookinForDriver';
import WaitForDriver from '../components/WaitForDriver';

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const LookRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [VechicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePanelAnimation = (ref, open, height = '70%', padding = 20) => {
    gsap.to(ref.current, {
      height: open ? height : '0%',
      opacity: open ? 1 : 0,
      padding: open ? padding : 0,
    });
  };

  useLayoutEffect(() => {
    handlePanelAnimation(panelRef, panelOpen);
    gsap.to(panelCloseRef.current, { opacity: panelOpen ? 1 : 0 });
  }, [panelOpen]);

  const handleSlideAnimation = (ref, open) => {
    gsap.to(ref.current, {
      transform: `translateY(${open ? '0' : '100%'})`,
      duration: 0.5,
    });
  };

  useLayoutEffect(() => handleSlideAnimation(vechilePanelRef, vehiclePanel), [vehiclePanel]);
  useLayoutEffect(() => handleSlideAnimation(ConfirmRideRef, ConfirmRidePanel), [ConfirmRidePanel]);
  useLayoutEffect(() => handleSlideAnimation(LookRef, VechicleFound), [VechicleFound]);
  useLayoutEffect(() => handleSlideAnimation(waitingForDriverRef, WaitingForDriver), [WaitingForDriver]);

  const fetchSuggestions = async (input, setSuggestions) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    fetchSuggestions(value, setPickupSuggestions);
    setActiveField('pickup');
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchSuggestions(value, setDestinationSuggestions);
    setActiveField('destination');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>
      <div className="top-0 flex flex-col justify-end absolute w-full h-screen">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="opacity-0 absolute top-5 right-5 text-2xl font-semibold text-gray-500 cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold p-5">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pick up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 opacity-0 bg-white">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vechilePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 w-full">
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={ConfirmRideRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 w-full">
        <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={LookRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 w-full">
        <LookinForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 w-full">
        <WaitForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

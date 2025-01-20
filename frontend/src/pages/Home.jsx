import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel'; // Ensure this path is correct
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookinForDriver from '../components/LookinForDriver';
import WaitForDriver from '../components/WaitForDriver';
import axios from 'axios';

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const ConfirmRideRef = useRef(null);
  const LookRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [VechicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [fare, setFare] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useLayoutEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 20,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
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

  useLayoutEffect(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRideRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      });
    } else {
      gsap.to(ConfirmRideRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      });
    }
  }, [ConfirmRidePanel]);

  useLayoutEffect(() => {
    if (VechicleFound) {
      gsap.to(LookRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      });
    } else {
      gsap.to(LookRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      });
    }
  }, [VechicleFound]);

  useLayoutEffect(() => {
    if (WaitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
        duration: 0.5,
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      });
    }
  }, [WaitingForDriver]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    setActiveField('pickup');
    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPickupSuggestions(response.data || []);
      } catch (error) {
        console.error('Error fetching pickup suggestions:', error);
      }
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setActiveField('destination');
    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDestinationSuggestions(response.data || []);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
      }
    }
  };

  const findTrip = async () => {
    if (!pickup || !destination) {
      console.error('Pickup and destination must be provided');
      return;
    }
  
    console.log('Finding trip with pickup:', pickup, 'and destination:', destination);
  
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      setFare(response.data.fare);
    } catch (error) {
      console.error('Error fetching fare:', error);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="top-0 flex flex-col justify-end absolute w-full h-screen">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="opacity-0 absolute top-5 right-5 text-2xl font-semibold text-gray-500"
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
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 w-full rounded-lg m-1 mt-3 font-semibold"
          >
            Find Trip
          </button>
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
        <VehiclePanel fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
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

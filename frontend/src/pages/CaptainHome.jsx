import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import gsap from 'gsap';

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true); // Controls Ride Popup visibility
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false); // Controls Confirm Ride Popup visibility

  const ridePopupPanelRef = useRef(null);
  const ConfirmRidePopupRef = useRef(null);

  // Animate Ride Popup Panel
  useLayoutEffect(() => {
    if (ridePopupPanelRef.current) {
      gsap.to(ridePopupPanelRef.current, {
        y: ridePopupPanel ? 0 : '100%', // Slide in or out
        duration: 0.5, // Animation duration
      });
    }
  }, [ridePopupPanel]);

  // Animate Confirm Ride Popup Panel
  useLayoutEffect(() => {
    if (ConfirmRidePopupRef.current) {
      gsap.to(ConfirmRidePopupRef.current, {
        y: ConfirmRidePopUpPanel ? 0 : '100%', // Slide in or out
        duration: 0.5, // Animation duration
      });
    }
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="h-screen">
      {/* Header Section */}
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

      {/* Main Content */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background Animation"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setridePopupPanel={setridePopupPanel} />
      </div>

      {/* Confirm Ride Popup Panel */}
      <div
        ref={ConfirmRidePopupRef}
        className="h-screen fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;

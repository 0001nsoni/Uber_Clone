import React from 'react';
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = (props) => {
    const locations = [
        "24B, Near kapoor's cafe,Sherayans Coding School , Bhopal",
        "123 Maple Street, Springfield, IL 62701, USA",
        "456 Oak Avenue, Riverside, CA 92501, USA",
        "789 Pine Lane, Evergreen, CO 80439, USA",
        "101 Birch Road, Lakeside, MI 49030, USA",
        "202 Cedar Boulevard, Westview, TX 75001, USA"
    ];
    const handleLocationClick = () => {
        props.setVehiclePanel(true); 
        props.setPanelOpen(false); // Ensure this matches the prop name in Home.js
      };
      


    return (
        <div>
            {/* sample data  */}
            {
            locations.map(function(element,idx)
            {
                return <div key={idx} onClick={handleLocationClick} className='flex items-center border-2 p-3 border-gray-100 active:border-black  rounded-xl  justify-start my-2 gap-4'>
                <h2 className='bg-[#e5e4e4] h-10 w-10 m-2 flex items-center justify-center rounded-full'>
                    <i className="ri-map-pin-fill"></i>
                </h2>
                <h4 className='font-medium text-base w-[70%]'>
                    {element}
                </h4>
            </div>
            })
        }
        

           
            
        </div>
    );
};

export default LocationSearchPanel;

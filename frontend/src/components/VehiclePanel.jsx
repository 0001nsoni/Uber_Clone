import React from 'react'

const VehiclePanel = (props) => {
   
    return (
        <div>
            
            <h5 className='p-3 text-center w-[90%] top-0   absolute'> <i className='ri-arrow-down-wide-line text-3xl text-gray-300' onClick={() => { props.setVehiclePanel(false); }}></i></h5>
            <h3 className='font-bold text-2xl text-center mb-5 w-full '>
                Choose your Ride</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.selectVehicle('car');
            }}  className='flex w-full border-2 mb-2 active:border-black  rounded-xl p-3 items-center justify-between ' >
                <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div  className=' w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm' >2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,compacts rides</p>
                </div>
                <h2 className='text-lg font-semibold'>
                    ₹{props.fare?.fare?.car}
                </h2>
            </div>

            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.selectVehicle('motorcycle');
            }} className='flex w-full border-2 mb-2 active:border-black  rounded-xl p-3 items-center justify-between '>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm' >3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,Motorcylce rides</p>
                </div>
                <h2 className='text-lg font-semibold'>
                
                ₹{props.fare?.fare?.motorcycle}
                </h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.selectVehicle('auto');
            }} className='flex w-full border-2 mb-2 active:border-black  rounded-xl p-3 items-center justify-between '>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className=' w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm' >2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>
               
                ₹{props.fare?.fare?.auto}
                </h2>
            </div>
        </div>
    )
}

export default VehiclePanel
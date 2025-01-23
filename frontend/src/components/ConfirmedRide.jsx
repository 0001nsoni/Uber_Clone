import React from 'react'
import 'remixicon/fonts/remixicon.css';

const ConfirmedRide = (props) => {
    
        const handleClose = () => {
            if (props.setConfirmRidePanel) props.setConfirmRidePanel(false);
          };
          const handleConfirm=()=>{
            props.setConfirmRidePanel(false);
            props.setVehicleFound(true)
            props.createRide()
          }
        

    return (
        <div>
            <h5 className='p-3 text-center w-[90%] top-0    absolute' onClick={handleClose}> <i className='ri-arrow-down-wide-line text-3xl text-gray-300'></i></h5>
            <h3 className='font-bold text-2xl text-center mb-5 w-full '>
                Confirm your Ride</h3>
            <div className='flex gap-2 flex-col justify-between items-center'>

                <img className='h-24' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='w-full'>
                    <div className='flex items-center m-5 p-3 gap-5 border-b-2'>
                        <i  className='text-lg ri-map-pin-2-fill'></i>
                        <div><h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    
                        <div className='flex items-center m-5 p-3 gap-5 border-b-2'>
                            <i className='text-lg ri-map-pin-2-fill'></i>
                            <div><h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                            </div>
                        </div>

                    
                    
                        <div className='flex items-center m-5 p-3 gap-5 '>
                            <i className='text-lg ri-currency-line'></i>
                            <div><h3 className='text-lg font-medium'>₹{props.fare?.fare?.[props.vehicleType]}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                            </div>
                        </div>
                    
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg ' onClick={handleConfirm} >Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmedRide
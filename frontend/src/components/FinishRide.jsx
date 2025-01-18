import React from 'react'
import { Link } from 'react-router-dom'
const FinishRide = (props) => {
    return (
        <div>
            <h5
                onClick={() => props.setFinishRidePanel && props.setFinishRidePanel(false)}
                className="p-3 text-center w-[90%] top-0 absolute"
            >
                <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
            </h5>
            <h3 className="font-bold text-2xl text-center mb-5 w-full">
                Finish This Ride
            </h3>

            <div className="flex bg-yellow-400 rounded-full items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                        alt="User"
                    />
                    <h2 className="text-lg font-medium">Neeraj Soni</h2>
                </div>
                <h5 className="text-lg px-2 font-semibold">2.2KM</h5>
            </div>

            <div className="flex gap-2 flex-col justify-between items-center">
                <div className="w-full">
                    <div className="flex items-center m-5 p-3 gap-5 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Ahemdabad</p>
                        </div>
                    </div>

                    <div className="flex items-center m-5 p-3 gap-5 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Kankariya Talab, Ahemdabad</p>
                        </div>
                    </div>

                    <div className="flex items-center m-5 p-3 gap-5">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹193.20</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
                    <Link to={'/captain-home'}
                        className="flex text-lg justify-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
                    >
                        Finish Ride
                    </Link>




                </div>
            </div>
        </div>
    )
}

export default FinishRide
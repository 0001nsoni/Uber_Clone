import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to={'/home'}  className='fixed h-10 w-10 shadow-md shadow-black bg-white flex items-center justify-center rounded-full right-2 top-2'>
            <i className=' text-lg font-medium
            ri-home-5-line '></i>
        </Link>
        <div className='h-[60%]'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-[40%] p-4'>
        <div className='flex items-center justify-between '>
                <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='text-right -mt-1 -mb-1'>
                    <h2 className='text-lg font-medium'>Neeraj</h2>
                    <h4 className='text-xl font-bold'>RJ 14 AB 1234</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

                </div>
            </div>

            <div className='flex gap-2 flex-col justify-between items-center'>
                <div className='w-full'>
          

                    <div className='flex items-center m-5 p-3 gap-5 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div><h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Ahemdabad</p>
                        </div>
                    </div>



                    <div className='flex items-center m-5 p-3 gap-5 '>
                        <i className='text-lg ri-currency-line'></i>
                        <div><h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>

            </div>
        
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Make a Payment</button>

        </div>

    </div>
  )
}

export default Riding
import React from 'react'

const WaitForDriver = (props) => {
    const handleopen=()=>{
props.setWaitingForDriver(false)
    };
  return (
    <div>
            <h5 className='p-3 text-center w-[90%] top-0     absolute' onClick={handleopen} > <i className='ri-arrow-down-wide-line text-3xl text-gray-300'></i></h5>
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

        </div>
  )
}

export default WaitForDriver
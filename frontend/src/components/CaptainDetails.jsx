import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
          <div className='flex items-center justify-between p-5'>
          <div className='flex item justify-between gap-3 '>
            <img className='h-10 w-10 rounded-full object-cover' src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LnBuZw.png" alt="" />
            <h4 className='text-lg font-medium'>Neeraj Soni</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹ 200.10</h4>
            <p className='text-sm font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-start' >
          <div className='text-center' >
            <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
            <h5 className='text-lg font-medium' >10.2</h5>
            <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>
          <div className='text-center' >

            <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center' >

            <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
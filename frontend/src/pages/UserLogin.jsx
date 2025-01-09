import { useState } from 'react'
import React  from 'react'
import { Link } from 'react-router-dom'

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>

                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

                <form >

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input required value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
                    <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' placeholder='Enter Password' />
                    <button className='bg-[#111] mb-7 text-[#fff] font-semibold rounded px-4 py-2  w-full text-lg '>Login</button>
                    <p className='text-center'>New here?
                        <Link to={"/signup"} className='text-blue-600'>Create new Account</Link>
                    </p>
                </form>
            </div>
            <div>
                <button className='bg-[#10b461] mb-7 text-[#fff] font-semibold rounded px-4 py-2  w-full text-lg '>Sign in as Captain</button>
            </div>
        </div>
    )
}

export default UserLogin
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function CaptainLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        const newCaptainData = { email: email, password: password };
        setCaptainData(newCaptainData);
        
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input required value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' placeholder='Enter Password' />
                    <button type="submit" className='bg-[#111] mb-7 text-[#fff] font-semibold rounded px-4 py-2 w-full text-lg'>Login</button>
                    <p className='text-center'>Join a fleet?
                        <Link to={"/captain-signup"} className='text-blue-600'> Register as a Captain</Link>
                    </p>
                </form>
            </div>
            <div>
                <Link to={'/login'} className='bg-orange-400 flex items-center justify-center mb-7 text-[#fff] font-semibold rounded px-4 py-2 w-full text-lg'>Sign in as User</Link>
            </div>
        </div>
    );
}

export default CaptainLogin;
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function CaptainSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        const newUserData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };
        setUserData(newUserData);
        // console.log(newUserData); 
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input required className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='First name' value={firstName} onChange={(e) => {
                            setFirstName(e.target.value);
                        }} />
                        <input required className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastName} onChange={(e) => {
                            setLastName(e.target.value);
                        }} />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input required className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input required type="password" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='bg-[#111] mb-5 text-[#fff] font-semibold rounded px-4 py-2 w-full text-lg'>Sign Up</button>
                    <p className='text-center'>Already have an account?
                        <Link to={"/captain-login"} className='text-blue-600'> Login here</Link>
                    </p>
                </form>
            </div>
            <div>
                <p className='text-[10px] text-center text-gray-400'>
                  This site is protected by reCAPTCHA and the  <span className='underline'>Google Privacy Policy</span> and  <span className='underline'>Terms of Service apply.</span> 
                </p>
            </div>
        </div>
    );
}

export default CaptainSignup;
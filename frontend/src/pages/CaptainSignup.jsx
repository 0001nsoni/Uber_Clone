import { useState, useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CaptainSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vechileColor, setVechileColor] = useState('');
    const [vechilePlate, setVechilePlate] = useState('');
    const [vechileCapacity, setVechileCapacity] = useState('');
    const [vechileType, setVechileType] = useState('');
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const { updateCaptainData } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUserData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vechileColor,
                plate: vechilePlate,
                capacity: vechileCapacity,
                vehicleType: vechileType
            }
        };
        try {
          
            const response = await axios.post(` ${import.meta.env.VITE_BASE_URL}/captain/register`, newUserData);
            if (response.status === 201) {
                const data = response.data;
                updateCaptainData(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("There was an error registering the captain:", error);
            // Handle the error appropriately here
        }
        setUserData(newUserData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVechileColor('');
        setVechilePlate('');
        setVechileCapacity('');
        setVechileType('');
    }

    return (
        <div className='p-4 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-12 mb-6' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-2 mb-4'>
                        <input required className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-lg placeholder:text-base' type="text" placeholder='First name' value={firstName} onChange={(e) => {
                            setFirstName(e.target.value);
                        }} />
                        <input required className='bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-lg placeholder:text-base' type="text" placeholder='Last name' value={lastName} onChange={(e) => {
                            setLastName(e.target.value);
                        }} />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input required className='bg-[#eeeeee] mb-4 rounded px-3 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input required type="password" className='bg-[#eeeeee] mb-5 rounded px-3 py-2 border w-full text-lg placeholder:text-base' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    {/* Vehicle Details Section */}
                    <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
                    <div className='flex gap-2 mb-4'>
                        <input required className='bg-[#eeeeee] rounded px-3 py-2 border w-1/2 text-lg placeholder:text-base' type="text" placeholder='Vehicle Color' value={vechileColor} onChange={(e) => setVechileColor(e.target.value)} />
                        <input required className='bg-[#eeeeee] rounded px-3 py-2 border w-1/2 text-lg placeholder:text-base' type="text" placeholder='Vehicle Plate' value={vechilePlate} onChange={(e) => setVechilePlate(e.target.value)} />
                    </div>
                    <div className='flex gap-2 mb-4'>
                        <input required className='bg-[#eeeeee] rounded px-3 py-2 border w-1/2 text-lg placeholder:text-base' type="number" placeholder='Vehicle Capacity' value={vechileCapacity} onChange={(e) => setVechileCapacity(e.target.value)} />
                        <select required className='bg-[#eeeeee] rounded px-3 py-2 border w-1/2 text-lg placeholder:text-base' value={vechileType} onChange={(e) => setVechileType(e.target.value)}>
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="motorcycle">Bike</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>

                    <button type="submit" className='bg-[#111] mb-4 text-[#fff] font-semibold rounded px-4 py-2 w-full text-lg'>Become a Captain</button>
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
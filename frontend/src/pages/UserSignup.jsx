import { useState, useContext } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

function UserSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUserData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUserData);
            if (response.status === 201) {
                const data = response.data;
                setUserData(data.user);
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error during user registration:", error);
        }
        setUserData(newUserData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
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
                    <button type="submit" className='bg-[#111] mb-5 text-[#fff] font-semibold rounded px-4 py-2 w-full text-lg'>Create account</button>
                    <p className='text-center'>Already have an account?
                        <Link to={"/login"} className='text-blue-600'> Login here</Link>
                    </p>
                </form>
            </div>
            <div>
                <p className='text-[10px] text-center text-gray-400'>
                    By proceeding, I agree to Uber's Terms of Use and acknowledge that I have read the Privacy Policy.
                </p>
            </div>
        </div>
    );
}

export default UserSignup;
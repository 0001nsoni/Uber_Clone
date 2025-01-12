import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext'; // Corrected import name
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext); // Destructure context correctly
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captain/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    setCaptain(response.data.captain);
                }
            } catch (err) {
                console.error('Error fetching captain profile:', err);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } finally {
                setIsLoading(false); // Ensure loading stops regardless of success or failure
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]); // Added necessary dependencies

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectedWrapper;

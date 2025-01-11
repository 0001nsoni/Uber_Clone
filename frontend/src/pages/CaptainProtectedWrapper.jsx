import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) {
        return null; // or a loading spinner
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default UserProtectedWrapper;
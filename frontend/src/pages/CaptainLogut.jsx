import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogut = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try{
                const resopnse= await axios.get(`${import.meta.env.VITE_API_BASE_URI}/captain/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(resopnse.status === 200){
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                }
            } catch (error){   
                console.error("Error during captain logout:", error);
            }
        };
        logout();
    }, [navigate, token]);
  return (
    <div>CaptainLogut</div>
  )
}

export default CaptainLogut
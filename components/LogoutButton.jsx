import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate()

    const logoutAction = () => {
        window.localStorage.removeItem('token');
        navigate("/login");
    }
    
  return (
    <button 
        className='bg-[#17479d] py-1 px-2 w-full border-solid border-0 rounded text-white font-medium hover:opacity-90' 
        onClick={logoutAction}>Logout</button>
  )
}

export default LogoutButton
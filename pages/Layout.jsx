import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Layout = ({ children }) => {
  const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token || token === '') {
      navigate('/login');
    } else {
      // Check if the token has expired
      const decodedToken = parseJwt(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTimestamp) {
        navigate('/login'); // Token has expired, redirect to login page
      } else {
        getUser();
      }
    }
  }, []);

  const getUser = () => {
    axios
      .get(`${USER_SERVICE_BASE_URL}auth/user`, {
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error(error);
        }
      });
  };

  // Helper function to parse the JWT token
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  const toggleActive = () => {
    setActive(!active);
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Navbar src={`/images/metrodata.png`} toggleActive={toggleActive} active={active} user={user.User}/>
      <Menu active={active} userRole={user.RoleName} userDivision={user.DivisionName} />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default Layout;
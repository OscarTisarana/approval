import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Content from '../components/Content'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'

const Home = () => {
    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;
    const navigate = useNavigate();
    const [user, setUser] = useState({})
 
    useEffect(()=>{
        if(window.localStorage.getItem('token') === "" || window.localStorage.getItem('token') === null){
            navigate("/login");
        }
        else {
            getUser()
        }
    },[])
 
    const getUser = () => {
        axios.get(`${USER_SERVICE_BASE_URL}auth/user`, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
        .then((r) => {
        //    console.log(r.data)
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
    const content = () => {
        switch(user.RoleName){
            case 'Admin':
                return <Content>Welcome {user.User}, you are logged in as {user.RoleName} and you are in division {user.DivisionName}</Content>
            case 'Employee':
                return <Content>Welcome {user.User}, you are logged in as {user.RoleName} and you are in division {user.DivisionName}</Content>
            case 'Manager':
                return <Content>Welcome {user.User}, you are logged in as {user.RoleName} and you are in division {user.DivisionName}</Content>
        }
    }

  return (
    // <div className='h-screen'>
    //   <Navbar src={`./images/metrodata.png`}/>
    //   <Menu/>    
    //   <div>{content()}</div>     
    // </div>
    <Layout>
        {content()}
    </Layout>

  )
}

export default Home
import React, { useEffect, useState } from 'react'
import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Layout from '../Layout'

const EditUser = () => {
    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

    const navigate = useNavigate()
    const location = useLocation() // passing value edit user id
    const [isLoading, setIsLoading] = useState(true);

    //use state
    const [name, setName] = useState("") 
    const [email, setEmail] = useState("")
    const [division, setDivision] = useState([]);
    const [divisionId, setDivisionId] = useState("")
    const [divisionName, setDivisionName] = useState("")
    const [role, setRole] = useState([]);
    const [roleId, setRoleId] = useState("")
    const [roleName, setRoleName] = useState("")
    const [newPassword, setNewPassword] = useState("")

    //validasi form
    const [validationName, setValidationName] = useState("")
    const [isValidName, setIsValidName] = useState(true)
    const [validationEmail, setValidationEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [validationDivision, setValidationDivision] = useState("")
    const [isValidDivision, setIsValidDivision] = useState(true)
    const [validationRole, setValidationRole] = useState("")
    const [isValidRole, setIsValidRole] = useState(true)
    const [validationNewPassword, setValidationNewPassword] = useState("")
    const [isValidNewPassword, setIsValidNewPassword] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false) 

    //custom styling
    const styleSubmitButton = "bg-[#17479d] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleCancelButton = "bg-[#FF0000] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleInputGroup = "py-3 px-14 border-0 border-gray-200 drop-shadow-md rounded-md text-sm w-full"

    useEffect(()=>{
        getUserById()
        // console.log(location.state.key)
    },[])
    
    const getUserById = async () => {
        await axios.get(`${USER_SERVICE_BASE_URL}auth/users?id=${location.state.key}`, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
        .then((res) => {
            // console.log(res.data.users[0])
            setName(res.data.users[0].Name)
            setEmail(res.data.users[0].Email)
            setDivisionName(res.data.users[0].DivisionName)
            setRoleName(res.data.users[0].RoleName)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false); // Ensure loading is set to false whether or not the request was successful
        })
    }

    useEffect(()=>{
        if(divisionName === "") return
        getDivision()
    },[divisionName])

    useEffect(()=>{
        if(roleName === "") return
        getRole()
    },[roleName])

    const getDivision = () => {
        axios.get(`${USER_SERVICE_BASE_URL}division`)
        .then((r) => {
            // console.log("divisions:",r.data)
            // console.log(divisionName)
            setDivision(r.data)
            const foundDivision = r.data.find((division) => division.DivisionName === divisionName);
            if (foundDivision) {
                setDivisionId(foundDivision.ID);
            }
            // console.log("foundDivision:",foundDivision)
        })
        .catch((e) => {
            console.log(e)
        });
    }

    const getRole = () => {
        axios.get(`${USER_SERVICE_BASE_URL}role`, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
        .then((r) => {
            // console.log("roles:",r.data)
            setRole(r.data)
            const foundRole = r.data.find((role) => role.role_name === roleName);
            if (foundRole) {
                setRoleId(foundRole.ID);
            }
            // console.log("foundRole:",foundRole)
        })
        .catch((e) => {
            console.log(e)
        });
    }

    const submitData = async() => {
        let payload = {
            id: location.state.key,
            name: name,
            email:email,
            DivisionId:parseInt(divisionId),
            RoleId:parseInt(roleId),
            password:newPassword,
        }
        try {
            // console.log("payload:",payload)
            await axios.put(`${USER_SERVICE_BASE_URL}auth/update`, payload, { headers:{Authorization: 'Bearer ' + window.localStorage.getItem('token')}})
            setIsSubmitting(false)
            navigate("/usermanagement")
        } catch (error) {
            // console.log(error)
            alert(error)
            setIsSubmitting(false)
        }
    }
      
    const editUserAction = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            setIsSubmitting(true);
            submitData();
        }
    }
    
    function validateName(name) {
        if (name !== "" && name.trim().length < 3) {
            if (name.length < 3) {
                setValidationName("Name must be at least 3 characters long!");
                return false;
            }
        }
        return true;
    }

    function validatePassword(newPassword) {
        if (newPassword !== "" && newPassword.length < 8) {
            setValidationNewPassword("New password must be at least 8 characters long!");
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        var reg = new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9.]+$");
        if (!reg.test(email)) {
            setValidationEmail("Invalid e-mail Address!");
            return false;
        }
        return true;
    }

    function validateForm() {      
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isNewPasswordValid = validatePassword(newPassword);
    
        setIsValidName(isNameValid);
        setIsValidEmail(isEmailValid);
        setIsValidNewPassword(isNewPasswordValid);
    
        return isNameValid && isEmailValid && isNewPasswordValid;
    }
    

    if (isLoading) {
        return <LoadingSpinner />;
    }

  return (
    <Layout>
        <div className='pl-3 md:pl-40 pt-28 w-full h-screen flex justify-center'>
            <div className='flex flex-col'>
                <form onSubmit={(e)=>{editUserAction(e)}}>
                    <h1 className="text-3xl font-semibold mb-4 md:mb-2 text-start">Edit User</h1>
                    <div className='flex flex-col'>
                        <div className='md:flex md:gap-8 py-2 md:py-4 w-full'>
                            <div className='md:w-1/2 mb-3 md:mb-0'>
                                <InputGroup
                                    autofocus
                                    classname={styleInputGroup}
                                    label={"Name"} 
                                    type={"text"} 
                                    placeholder={"Input your name here..."} 
                                    name={"name"} 
                                    id={"name"}
                                    value={name}
                                    for={name}
                                    onchange={setName}
                                    />
                                    {
                                        !isValidName && (
                                            <span className="text-xs text-red-500 italic">
                                                {validationName}
                                            </span>
                                        )
                                    }  
                            </div>
                            <div className='md:w-1/2'>
                                <InputGroup
                                    classname={styleInputGroup}
                                    label={"Email"} 
                                    type={"email"} 
                                    placeholder={"Input your email here..."} 
                                    name={"email"} 
                                    id={"email"}
                                    value={email}
                                    for={email}
                                    onchange={setEmail}
                                />
                                {
                                    !isValidEmail && (
                                        <span className="text-xs text-red-500 italic">
                                            {validationEmail}
                                        </span>
                                    )
                                } 
                            </div>
                        </div>
                        <div className='md:flex md:gap-8 py-2 md:py-4 w-full'>
                            <div className='md:w-1/2 mb-3 md:mb-0'>
                                <div className="input-group flex flex-col items-start">
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Division</label>
                                    <select
                                        id="divisionID"
                                        name="divisionID"
                                        className="py-3 px-4 border-0 drop-shadow-md rounded-md text-sm w-full font-normal"
                                        onChange={(e) => setDivisionId(e.target.value)}
                    
                                        value={divisionId}
                                        >
                                        {/* <option value={divisionName}></option> */}
                                       {division.map((division) => ( 
                                            <option key={division.ID} value={division.ID}>
                                                {division.DivisionName}
                                            </option>
                                        ))} 
                                    </select>
                                    {
                                        !isValidDivision && (
                                            <span className="text-xs text-red-500 italic">
                                                {validationDivision}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='md:w-1/2'>
                                <div className="input-group flex flex-col items-start">
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
                                    <select
                                        id="roleID"
                                        name="roleID"
                                        className="py-3 px-4 border-0 drop-shadow-md rounded-md text-sm w-full font-normal"
                                        onChange={(e) => setRoleId(e.target.value)}
                                        value={roleId}
                                        >
                                        {/* <option value={roleName}></option> */}
                                        {role.map((role) => (
                                            <option key={role.ID} value={role.ID}>
                                            {role.role_name}
                                            </option>
                                        ))} 
                                    </select>
                                    {
                                        !isValidRole && (
                                            <span className="text-xs text-red-500 italic">
                                                {validationRole}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>                            
                        </div>        
                        <div className='py-2 md:py-4 w1/2'>
                            <InputGroup 
                                classname={styleInputGroup}
                                label={"Password"} 
                                type={"password"} 
                                placeholder={"Input your new password here.."} 
                                name={"password"} 
                                id={"password"}
                                value={newPassword}
                                for={"password"}
                                onchange={setNewPassword}/>
                                {
                                    !isValidNewPassword && (
                                        <span className="text-xs text-red-500 italic">
                                            {validationNewPassword}
                                        </span>
                                    )
                                }   
                        </div>
                        <div className='flex gap-4 md:gap-8'>
                            <Button text={"Edit"} type={'submit'} classname={styleSubmitButton} disabled={isSubmitting} onclick={validateForm}/>
                            <Button text={"Cancel"} type={'button'} classname={styleCancelButton} onclick={()=>{navigate('/usermanagement')}}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
    
  )
}

export default EditUser
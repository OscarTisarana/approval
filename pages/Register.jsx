import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroup";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [division, setDivision] = useState([]);
    const [divisionID, setDivisionID] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // validasi data
    const [validationName, setValidationName] = useState("")
    const [isValidName, setIsValidName] = useState(true)
    const [validationEmail, setValidationEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [validationDivision, setValidationDivision] = useState("")
    const [isValidDivision, setIsValidDivision] = useState(true)
    const [validationPassword, setValidationPassword] = useState("")
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [validationConfirmPassword, setValidationConfirmPassword] = useState("")
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const styleLoginRegisterButton = "bg-[#5AA6FF] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleInputGroup = "py-3 px-12 border-0 border-gray-200 drop-shadow-md rounded-md text-sm"

    useEffect(()=>{
        if(localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null){
            navigate("/");
        } else{
            getDivision();
        }
    },[navigate])

    const getDivision = () => {
        axios.get(`${USER_SERVICE_BASE_URL}division`)
        .then((r) => {
            // console.log(r.data)
            setDivision(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }

    function validateName(name) {
        if (name !== null || name !== "" || name !== undefined) {
            if (name.trim().length < 3) {
                setValidationName("Name must be at least 3 characters long!");
                return false;
            }
        } else{
            setValidationName("Name can't be blank!");
            return false;
        }
        return true;
    }

    function validatePassword(password) {
        if (password === null || password === "") {
            setValidationPassword("Password can't be blank!");
            return false;
        }
        else if (password.length < 8) {
            setValidationPassword("Password must be at least 8 characters long!");
            return false;
        }
        return true;
    }

    function validatePasswordConfirmation(password, confirmpassword) {
        console.log(password, confirmpassword)
        if (password === confirmpassword) {
            return true;
        }
        else {
            setValidationConfirmPassword("Entered Passwords are not same!");
            return false;
        }
    }

    function validateEmail(email) {
        var reg = new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9.]+$");
        if (!reg.test(email)) {
            setValidationEmail("Invalid e-mail Address!");
            return false;
        }
        return true;
    }

    function validateDivision(divisionID){
        if(divisionID === null || divisionID === "" || divisionID === undefined){
            setValidationDivision("Must pick a division")
            return false;
        }
        return true
    }

    function validateForm() {    
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isDivisionValid = validateDivision(divisionID);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validatePasswordConfirmation(password, confirmPassword);

        setIsValidName(isNameValid);
        setIsValidEmail(isEmailValid);
        setIsValidDivision(isDivisionValid)
        setIsValidPassword(isPasswordValid);
        setIsValidConfirmPassword(isConfirmPasswordValid);

        return isNameValid && isEmailValid && isDivisionValid && isPasswordValid && isConfirmPasswordValid;
    }

    const submitData = async() => {
        let payload = {
            name: name,
            email:email,
            DivisionId:parseInt(divisionID),
            password:password,
            confirmpassword:confirmPassword
        }
        try {
            await axios.post(`${USER_SERVICE_BASE_URL}auth/register`, payload)
            setIsSubmitting(false)
            navigate("/email/notification")
        } catch (error) {
            // console.log(error)
            // alert(error.response.statusText)
            alert('Registration Failed! Check Your Credentials')
            setIsSubmitting(false)
        }
    }
 
    const registerAction = (e) => {
        e.preventDefault();
        if(validateForm()){
            setIsSubmitting(true)
            submitData()
        }
    }

    return (
        <div className="flex h-screen justify-center md:justify-start overflow-auto">
            <div className="md:w-2/5 border-solid flex items-center justify-center z-30 bg-white">
                <div className="wrapper flex py-4 md:pt-28">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-4 text-start">Register</h1>
                        <div className="form flex border-solid justify-center">
                            <form name="register" className="" onSubmit={(e)=>registerAction(e)}>
                                <div className="py-3">
                                    <InputGroup 
                                        classname={styleInputGroup}
                                        label={"Name"} 
                                        type={"text"} 
                                        placeholder={"Input your name here.."} 
                                        autofocus 
                                        name={"name"} 
                                        id={"name"}
                                        value={name}
                                        for={name}
                                        onchange={setName}/>
                                        {
                                            !isValidName && (
                                                <div className="h-4">
                                                    <span className="text-xs text-red-500 italic">
                                                        {validationName}
                                                    </span>
                                                </div>
                                            )
                                        }
                                </div>                                  
                                <div className="py-3">
                                    <InputGroup 
                                        classname={styleInputGroup}
                                        label={"Email"} 
                                        type={"email"} 
                                        placeholder={"Input your email here.."} 
                                        name={"email"} 
                                        id={"email"}
                                        value={email}
                                        for={"email"}
                                        onchange={setEmail}/>                                           
                                        {
                                            !isValidEmail && (
                                                <div className="h-4">
                                                    <span className="text-xs text-red-500 italic">
                                                        {validationEmail}
                                                    </span>
                                                </div>
                                            )
                                        }
                                </div>
                                <div className="py-3">
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Division</label>
                                    <select
                                        id="divisionID"
                                        name="divisionID"
                                        className="py-3 px-4 border-0 drop-shadow-md rounded-md text-sm w-full font-normal"
                                        onChange={(e) => setDivisionID(e.target.value)}
                                        value={divisionID}
                                        >
                                        <option hidden>Choose a division</option>
                                        {division.map((division) => (
                                            <option key={division.ID} value={division.ID}>
                                            {division.DivisionName}
                                            </option>
                                        ))}
                                    </select>                                        
                                    {
                                        !isValidDivision && (
                                            <div className="h-4">
                                                <span className="text-xs text-red-500 italic">
                                                    {validationDivision}
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="py-3">
                                    <InputGroup 
                                        classname={styleInputGroup}
                                        label={"Password"} 
                                        type={"password"} 
                                        placeholder={"Input your password here.."} 
                                        name={"password"} 
                                        id={"password"}
                                        value={password}
                                        for={"password"}
                                        onchange={setPassword}/>                                        
                                        {
                                            !isValidPassword && (
                                                <div className="h-4">
                                                    <span className="text-xs text-red-500 italic">
                                                        {validationPassword}
                                                    </span>
                                                </div>
                                            )
                                        }      
                                </div>
                                <div className="pt-3">
                                    <InputGroup 
                                        classname={styleInputGroup}
                                        label={"Confirm Password"} 
                                        type={"password"}  
                                        placeholder={"Confirm your password.."} 
                                        name={"confirmPassword"} 
                                        id={"confirmPassword"}
                                        value={confirmPassword}
                                        for={"confirmPassword"}
                                        onchange={setConfirmPassword}/> 
                                        {
                                            !isValidConfirmPassword && (
                                                <div className="h-4">
                                                    <span className="text-xs text-red-500 italic">
                                                        {validationConfirmPassword}
                                                    </span>
                                                </div>
                                            )
                                        }  
                                </div>
                                <div className="flex pt-2 md:pt-4">
                                    <Button text={"Register"} type={"submit"} disabled={isSubmitting} onclick={validateForm} classname={styleLoginRegisterButton}/>
                                </div>    
                            </form>
                        </div>
                        <p className="text-xs text-center">Already have an account? <a href="/login" className="font-semibold">Log in here</a></p>
                    </div>
                </div>
            </div>
            <div className="md:right-0 border-solid md:w-3/5 h-full absolute bg-gray-200 rounded-l-xl hidden md:block">
                
            </div>
        </div>
    )
}

export default Register;
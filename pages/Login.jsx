import React, { useEffect, useState } from "react";
import axios from "axios";
import InputGroup from "../components/InputGroup";
import ThirdPartyGroup from "../components/ThirdPartyGroup";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    // validation
    const [validationEmail, setValidationEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [validationPassword, setValidationPassword] = useState("")
    const [isValidPassword, setIsValidPassword] = useState(true)

    const styleLoginRegisterButton = "bg-[#5AA6FF] py-2 px-3 w-full border-solid border-0 rounded my-5 text-white font-bold hover:opacity-90"
    const styleInputGroup = "py-3 px-12 border-0 border-gray-200 drop-shadow-md rounded-md text-sm"

    useEffect(()=>{
        if(window.localStorage.getItem('token') !== "" && window.localStorage.getItem('token') !== null){
            navigate("/");
        }
        // console.log(window.localStorage.getItem('token'))
    },[])
 
    function validateEmail(email) {
        var reg = new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9.]+$");
        if (!reg.test(email)) {
            setValidationEmail("Invalid e-mail Address!");
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

    function validateForm() {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setIsValidEmail(isEmailValid);
        setIsValidPassword(isPasswordValid);

        return isEmailValid && isPasswordValid;
    }

    const submitData = async() =>{
        let payload = {
            email:email,
            password:password,
        }
        try {
            const req = await axios.post(`${USER_SERVICE_BASE_URL}auth/login`, payload)
            setIsSubmitting(false)
            window.localStorage.setItem('token', req.data.Data.AccessToken)
            navigate("/");
        } catch (error) {
            setIsSubmitting(false)
            alert(error.response.data.message)
        }
    }

    const loginAction = (e) => {
        e.preventDefault();
        if(validateForm()){
            setIsSubmitting(true)
            submitData()
        }
    }
 
    return (    
            <div className="flex h-screen justify-center md:justify-end m">
                <div className="left-0 border-solid w-3/5 h-full absolute bg-gray-200 rounded-r-xl hidden md:block">
                    
                </div>
                <div className="w-2/5 border-solid flex items-center bg-white z-40 justify-center">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-4 text-start">Login</h1>
                        <div className="form flex border-solid justify-center">
                            <form name="login" onSubmit={(e)=>{loginAction(e)}}>
                                <div className="py-3">
                                    <InputGroup 
                                        classname={styleInputGroup}
                                        label={"Email"} 
                                        type={"email"} 
                                        placeholder={"Input your email here.."} 
                                        autofocus 
                                        name={"email"} 
                                        id={"email"}
                                        value={email}
                                        onchange={setEmail}/>
                                        {
                                            !isValidEmail && (
                                                <span className="text-xs text-red-500 italic">
                                                    {validationEmail}
                                                </span>
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
                                        onchange={setPassword}/>
                                        {
                                            !isValidPassword && (
                                                <span className="text-xs text-red-500 italic">
                                                    {validationPassword}
                                                </span>
                                            )
                                        }  
                                </div>
                                <Button disabled={isSubmitting} text={"Login"} type={"submit"} onclick={validateForm} classname={styleLoginRegisterButton}/>
                            </form>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs text-center mb-2">Don’t have an account? <a href="/register" className="font-semibold">Sign Up Here</a></p>
                            <div className="flex justify-center items-center mb-2">
                                <hr className="inline-block h-px w-full border-none bg-zinc-950"/>
                                    <p className="text-sm mb-1 px-2">or</p>
                                <hr className="inline-block h-px w-full border-none bg-zinc-950"/>
                            </div>
                            <ThirdPartyGroup src={"images/google.png"} href={""} text={"Login with Google"}/>
                        </div>
                    </div>        
                </div>
            </div>
    )
}

export default Login;
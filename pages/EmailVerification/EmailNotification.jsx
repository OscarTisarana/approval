import React from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const EmailNotification = () => {

    const navigate = useNavigate()

  return (
    <div className='h-screen'>
        <div className='flex h-full justify-center items-center text-center'>
            <div className='flex flex-col border border-solid p-6 h-60 w-54 justify-center'>
                <div className='flex flex-col gap-2 mb-6'>
                    <p className='text-4xl font-bold'>Account Verification</p>
                    <p className='italic font-light'><strong>Please verify your account using the <u>link sent to your email</u></strong></p>
                </div>
                <Button classname={"bg-[#17479d] py-2 px-3 w-full border-solid border-0 rounded-lg my-5 text-white font-bold hover:opacity-90"} type={"button"} text={"Proceed"}onclick={()=>{navigate('/login')}}/>
            </div>
        </div>
    </div>
  )
}

export default EmailNotification
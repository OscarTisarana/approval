import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import Button from './Button'
import IconSortDown from '../Icons/IconSortDown'

const Navbar = ({src, toggleActive, active, user}) => {

  const navigate =  useNavigate()
  return (
    <div style={{padding:16, margin:0, justifyContent:'space-between'}} className='fixed top-0 flex w-full h-18 border-solid border drop-shadow-md z-50 bg-white'>
        <div className='flex items-center gap-4'>
            <div className='md:hidden block items-center'>
              <button onClick={toggleActive} className="flex h-8 items-center">
                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all duration-200 shadow-md">
                    <div className={`flex flex-col justify-between items-center w-[15px] h-[15px] transform duration-300 origin-center overflow-hidden ${active ? 'translate-x-1.5' : ''}`}>
                      <div className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${active ? 'rotate-[42deg] w-2/3 delay-150' : ''}`}></div>
                      <div className={`bg-black h-[2px] w-7 rounded transform transition-all duration-300 ${active ? 'opacity-0' : ''}`}></div>
                      <div className={`bg-black h-[2px] w-7 transform transition-all duration-300 origin-left ${active ? '-rotate-[42deg] w-2/3 delay-150' : ''}`}></div>
                    </div>
                </div>
              </button>
            </div>
            <div className='flex justify-center items-center'>
              <NavLink to={'/'}>
                <img src={src} alt='./images/metrodata.png' className='w-10'/>
              </NavLink>
            </div>
        </div>
        <div className='flex gap-3 items-center'>
           <img src="./images/notification_bell.png" alt="" className='cursor-pointer h-6 mr-4' onClick={()=>{navigate('/')}}/>
           <LogoutButton/>
            {/* <Button text={"Profile"} classname={'font-semibold text-medium py-1 px-2'} onclick={()=>{navigate('/')}}/> */}
            <div className={'font-semibold text-medium py-1 px-2 min-w-full flex items-center gap-1 cursor-pointer'}>
              {user}
              <IconSortDown className="inline-block"/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
import React from 'react'

const Button = ({text, type, onclick, disabled, classname}) => {
  return (
    <button 
      onClick={onclick} 
      type={type} 
      className={classname} 
      disabled={disabled}>{text}</button>
  )
}

export default Button
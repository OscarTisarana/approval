import React from "react";

const InputGroup = ({label, classname, type, placeholder, autofocus=false, onchange, name, id, value, forvalue, accept, min, max}) => {
    if(type === "textarea"){
        return (
          <div className="input-group flex flex-col items-start">
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor={forvalue}>{label}</label>
            <textarea
              className={classname}
              placeholder={placeholder}
              autoFocus={autofocus}
              name={name}
              id={id}
              value={value}
              onChange={(e) => { onchange(e.target.value) }}
            />
          </div>
        )
      } else if(type === "file"){
          return (
            <div className="input-group flex flex-col items-start">
                  <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor={forvalue}>{label}</label>
                  <input 
                      className={classname} 
                      type={type} 
                      placeholder={placeholder} 
                      autoFocus={autofocus} 
                      name={name}
                      id={id}
                      onChange={(e)=>{onchange(e)}}/>
              </div>
        )
      } else {
          return (      
              <div className="input-group flex flex-col items-start">
                  <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor={forvalue}>{label}</label>
                  <input 
                      className={classname} 
                      type={type} 
                      placeholder={placeholder} 
                      autoFocus={autofocus} 
                      name={name}
                      id={id}
                      value={value}
                      accept={accept} 
                      min={min}
                      max={max}
                      onChange={(e)=>{onchange(e.target.value)}}/>
              </div>
          )
    }
}

export default InputGroup;
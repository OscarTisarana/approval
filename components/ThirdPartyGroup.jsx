import React from "react";

const ThirdPartyGroup = ({src,text,href}) => {
    return(
        <div className="border-2 border-solid flex justify-center gap-3 p-2 text-sm">
            <img src={src} className="w-6" alt="" />
            <div>
                <a href={href} className="text-slate-700 font-medium">{text}</a>
            </div>
       </div>
    )
}

export default React.memo(ThirdPartyGroup);
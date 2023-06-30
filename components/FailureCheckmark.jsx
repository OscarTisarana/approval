import React from 'react';
import '../css/FailureCheckmark.css'

const FailureCheckmark = ({ showFailure }) => {
  if (!showFailure) {
    return null;
  }

  return (
    <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg bg-custom-gray fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pt-8">
        <div className="flex flex-col justify-center items-center h-full">
            <div className="circle-border-error">     
            </div>
            <div className="circle-error">
                <div className="error flex justify-center items-center"></div>
            </div>
        </div>
    
    <div className="px-6 py-4 flex flex-col justify-center text-center">
        <div className="font-bold text-xl mb-2 pt-5 ml-2 text-red-400 justify-center item-center">OOPS!</div>
        <div className="font-bold text-xl mb-2 ml-2 text-red-400 justify-center item-center">Something Went Wrong</div>
        <div className="text-md mb-2  ml-2 text-red-400 justify-center item-center">Please try again</div>
    </div>
</div>

  );
};

export default FailureCheckmark;



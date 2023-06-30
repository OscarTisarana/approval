import React from 'react';
import '../css/SuccessCheckmark.css'

const SuccessCheckmark = ({ showSuccess }) => {
  if (!showSuccess) {
    return null;
  }

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-custom-gray fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="success-checkmark pt-10">
            <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
            </div>
        </div>
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 pt-5 ml-2 text-green-500">SUCCESS</div>
        </div>
    </div>
    // <div class="max-w-sm rounded overflow-hidden shadow-lg bg-custom-gray">
    //     <div className="success-checkmark bg-custom-gray fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    //     <div className="check-icon">
    //         <span className="icon-line line-tip"></span>
    //         <span className="icon-line line-long"></span>
    //         <div className="icon-circle"></div>
    //         <div className="icon-fix"></div>
    //     </div>
    //     <div className="mt-4 text-center">
    //         <h2 className="text-2xl font-bold text-green-500">SUCCESS</h2>
    //     </div>
    //     </div>
    // </div>
  );
};

export default SuccessCheckmark;
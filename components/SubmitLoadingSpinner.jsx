import React from "react";

const SubmitLoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
    );
};

export default SubmitLoadingSpinner;
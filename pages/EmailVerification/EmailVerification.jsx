import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SuccessCheckmark from '../../components/SuccessCheckmark';

const EmailVerification = () => {
  const USER_SERVICE_BASE_URL = process.env.REACT_APP_API_URL_User_Service;

  const [success, setSuccess] = useState(false);
  const { code, email } = useParams();
  const [error, setError] = useState("");
  const [rendered, setRendered] = useState(false); // Flag to track initial render

  useEffect(() => {
    const verifyCode = async () => {
      try {
        const response = await axios.get(`${USER_SERVICE_BASE_URL}auth/verify/${code}/${email}`);
        console.log("code & email: ", code, email);
        if (response.data.verified) {
          setSuccess(true);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    // Make the API call only if the component has already rendered once
    if (rendered) {
      verifyCode();
    } else {
      setRendered(true);
    }
  }, [code, email, rendered]);

  return (
    <div className="h-screen">
      <div className="flex h-full justify-center items-center">
        <div className="p-6 h-96 w-54 flex justify-center items-center">
          {success && rendered ? (
            <>
              <div class="max-w-sm rounded overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="success-checkmark pt-10">
                  <div className="check-icon bg-inherit">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                <div class="px-6 py-2">
                  <div class="font-bold text-xl pt-5 ml-2 text-green-500">SUCCESS</div>
                </div>
              </div>
              <div className='text-center'>
                <p className="text-4xl mb-2 font-bold">Your Account has been verified!</p>
                <p>
                  You can now proceed to the <a href="/login"><u>app!</u></a>
                </p>
              </div>
            </>
          ) : (
            <div className='p-6 border'>
              <span className='text-4xl font-bold'>{error}</span>
              <p className='text-center mt-4'>
                  You can now proceed to the <a href="/login"><u>app!</u></a>
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
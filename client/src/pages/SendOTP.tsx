import React from 'react'
import { useLocation } from 'react-router-dom';

const SendOTP = () => {

    const location = useLocation()

  
    const email1 = location.state.email;
  return (
    <div>SendOTP

      `${email1}`
    </div>
  )
}

export default SendOTP
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const SendOTP = () => {

  const location = useLocation()
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  // const [isDisabled, setIsDisabled] = useState(false);

  const email1 = location?.state?.email;

  

  const [email, setEmail] = useState(email1);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);





  // form function
  const SendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/send-otp`, {email});
      if (res && res.data.success) {
        toast.success(res.data.message);
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };


  // form function
  const VerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/otp-verification`, {
        email,
        otp
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };





  return (
    <>

      <Toaster position="bottom-center" reverseOrder={false} />
      <main className="main">

        {/* <div className="left">
        <img className="bgimg" src="/Resources/SignIn.png" alt="Logo" />
      </div> */}

        <div className="right">
          <div className="container1">

            <div className="heading"><h1 className="h1">Verify your Email <span></span> </h1> </div>
            {otpSent === true ? (
              <h5 style={{ color: "green" }} className="h5">Otp Sent Check Your Email for OTP</h5>
            ) : ("")}
            <form onSubmit={otpSent === true ? VerifyOTP : SendOTP}>


              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required 
                  disabled={email1? true : false}
                  />
              </div>
              {otpSent === true ? (
                <div className="form-group">
                  <input
                    type="text"
                    id="OTP"
                    name="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter your OTP"
                    required
                  />

                </div>
              ) : ("")}


              <br />
              <button className="button" type="submit">{otpSent === true ? ("Verify") : ("Send OTP")}</button>
            </form>
          </div>
        </div>


      </main>
    </>

  )
}

export default SendOTP
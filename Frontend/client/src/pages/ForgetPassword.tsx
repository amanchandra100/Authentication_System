import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link,useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../styles/login.css"



const ForgetPassword = () => {
  
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [icon, setIcon] = useState("/Resources/hide.png");
  const [icon1, setIcon1] = useState("/Resources/hide.png");

  const navigate = useNavigate();
  const location = useLocation()
  
  const email1 = location?.state?.email;
  const OTP = location?.state?.otp;
  
  const [email, setEmail] = useState(email1);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [otp, setOtp] = useState(OTP);


  
  const togglePasswordVisibility = (): void => {
    if (type === "password") {
      setIcon("/Resources/eye.png"); 
      setType("text"); 
    } else {
      setIcon("/Resources/hide.png"); 
      setType("password"); 
    }
  }
  const togglePasswordVisibility1 = (): void => {
    if (type1 === "password") {
      setIcon1("/Resources/eye.png"); 
      setType1("text"); 
    } else {
      setIcon1("/Resources/hide.png"); 
      setType1("password"); 
    }
  }


  // useEffect(()=> {
  //   setEmail(email1)
  //   },[email1])

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newConfirmPassword) {
      toast.error("Confirm Passward not match");
      return
      
    }
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        otp,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
      <div className="container2">
      
      <div className="heading"><h1 className="h1">Set New Passward</h1> </div>
      <form onSubmit={handleSubmit}>
  
        <div className="form-group">
          <input
           type="email" 
           id="email" 
           name="email"
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
           placeholder="Email"
           required />
        </div>        
        
        <div className="form-group">
          <input
            type={type}
            id="password"
            name="password"
            value={newPassword}
            onChange={(e)=>{setNewPassword(e.target.value)}}
            placeholder="Set Password"
            required
          />
          <span className="password-icon" onClick={togglePasswordVisibility}>
          <img className="hideimg" src={icon} alt= "logo" />
          </span>
        </div>

        <div className="form-group">
          <input
            // style={{border:`${showAlert === true ? "2px solid red":""}`}}
            type={type1}
            id="confirm-password"
            name="confirmPassword"
            value={newConfirmPassword}
            onChange={(e)=>{setNewConfirmPassword(e.target.value)}}
            placeholder="Retype Password"
            required
          />
          <span className="password-icon1" onClick={togglePasswordVisibility1}>
           <img className="hideimg" src={icon1} alt="logo"  />
          </span>
        </div>

        <br/>
        <button className="button" type="submit">Reset Passward</button>
        <br/>
        <br/>
        {/* <Link to={"/"}><button className="button1" >Sign Up</button></Link> */}
      </form>
    </div>
    </div>
    

  </main>
    </>
  )
}

export default ForgetPassword
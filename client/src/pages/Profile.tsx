import React, { useEffect, useState } from 'react'

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast, { Toaster } from "react-hot-toast";
import "../styles/home.css";

const Profile = () => {

    const [auth, setAuth] = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
  
   
    const [verified, setVerified] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        const { firstName, lastName, email, verified } = auth?.user;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setVerified(verified);
      }, [auth?.user]);

      

    
      const handleVerificaton = (e) => {
        e.preventDefault();
        navigate("/send-otp", { state: { email: email } });
      };

      
   // Handaje log out
   const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate('/login')

    
  };


    return (
        <>
     <Toaster position="bottom-center" reverseOrder={false} />
    <div  className="nav">
      <div className="logo-div">

      <h2>Wellcome to Profile</h2>
      </div>
      <div className="btns">
      <button className="btn-out" onClick={handlelogout} type="submit">Sign Out</button>
      <Link to={"/home"}><button className="btn-out">Home</button></Link>
      </div>
    </div>

    <div className='details-div'>
        <div className="details">
        <h1>User Details</h1>
        <br/>
        <h2>Name:   {auth?.user?.firstName} {auth?.user?.lastName}</h2>
        <h2>Email:  {auth?.user?.email}</h2>
        {verified === 0 ? ( <>
                       <h3 style={{color:"red"}}>Your email is not Verified</h3>
                       <button onClick={handleVerificaton} className="emaildivbtn">
                        Click Here to Verify
                       </button>
                       </>
                     ) : (
                      ""
                    )}
        <h2>Contact Mode:   {auth?.user?.contactMode}</h2>
        </div>
        
        
      </div>
    
    </>
    )
}

export default Profile
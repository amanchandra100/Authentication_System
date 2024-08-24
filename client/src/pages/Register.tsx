import React, { useState } from "react";
import "../styles/register.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"

interface User {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const RegisterForm: React.FC = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/Resources/hide.png");
  const [icon1, setIcon1] = useState("/Resources/hide.png");
  const [icon2, setIcon2] = useState("/Resources/hide.png");
  const [contactOption, setContactOption] = useState("");
  const [show, setShow] = useState(false);
  

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });



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
    if (type === "password") {
      setIcon1("/Resources/eye.png"); 
      setType("text"); 
    } else {
      setIcon1("/Resources/hide.png"); 
      setType("password"); 
    }
  }
  const toggleDropDown = (): void => {
    if (show === false) {
      setShow(true)
      
    } else {
      setShow(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    user["contactMode"] = contactOption;
    console.log("User Data:", user);
    console.log("User Data:",  contactOption);
  };

  return (
    <>
    
   
    <main className="main">

      <div className="left">
        <img className="bgimg" src="/Resources/SignUp.png" alt="Logo" />
      </div>

    <div className="right">
      <div className="container">
      
      <div className="heading"><h1 className="h1">Let us Know<span> !</span> </h1> <Link to={"/login"}><h2 className="h2">Sign<span>In</span></h2></Link></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type={type}
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Set Password"
            required
          />
          <span className="password-icon" onClick={togglePasswordVisibility}>
          <img className="hideimg" src={icon} alt= "logo" />
          </span>
        </div>

        <div className="form-group">
          <input
            type={type}
            id="confirm-password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Retype Password"
            required
          />
          <span className="password-icon1" onClick={togglePasswordVisibility1}>
           <img className="hideimg" src={icon1} alt="logo"  />
          </span>
        </div>

        <div className="form-group contact-mode">
          <input
            type="text"
            id="contact-mode"
            name="contactMode"
            value={contactOption}
            // onChange={()=>{ setContactOption(contactOption)}}

            placeholder="Contact Mode"
            disabled
          />
          <span className="password-icon" onClick={toggleDropDown}>
          <img className="hideimg" src="/Resources/down.png" alt= "logo" />
          </span>
          {show===true ? (
             <div className="dropdown1">
            <h6 className="option" onClick={()=>{
              setContactOption("Email")
              setShow(false)
              
              }}>Email</h6>
            <h6 className="option" onClick={()=>{
              setContactOption("Phone")
              setShow(false)
              
              }}>Phone</h6>
            
          </div>
          ): (
            ""
          )}
         
        </div>

        <div className="form-group">
          <input
           type="email" 
           id="email" 
           name="email"
           value={user.email}
           onChange={handleChange}
           placeholder="Email"
           required />
        </div>
        <br/>
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    

  </main>
    </>


  );
};

export default RegisterForm;

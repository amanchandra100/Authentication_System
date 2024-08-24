import React, { useState } from "react";
import "../styles/login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"

interface User {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  contactMode: string;
  email: string;
}

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactMode: "",
    email: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/Resources/hide.png"); 



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
      setIcon("/Resources/eye.png"); 
      setType("text"); 
    } else {
      setIcon("/Resources/hide.png"); 
      setType("password"); 
    }
  }
  const toggleDropDown = (): void => {
    if (type === "password") {
      setIcon("<i class='fas fa-eye-slash'></i>"); 
      setType("text"); 
    } else {
      setIcon("<i class='fas fa-eye'></i>"); 
      setType("password"); 
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
    console.log("User Data:", user);
  };

  return (
    <>
    
   
    <main className="main">

      <div className="left">
        <img className="bgimg" src="/Resources/SignIn.png" alt="Logo" />
      </div>

    <div className="right">
      <div className="container1">
      
      <div className="heading"><h1 className="h1">Fill what we know <span> !</span> </h1> <Link to={"/signIn"}><h2 className="h2"><span></span></h2></Link></div>
      <form onSubmit={handleSubmit}>
  
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

        <br/>
        <button className="button" type="submit">Sign In</button>
        <br/>
        <br/>
        <Link to={"/"}><button className="button1" type="submit">Sign Up</button></Link>
      </form>
    </div>
    </div>
    

  </main>
    </>


  );
};

export default LoginForm;

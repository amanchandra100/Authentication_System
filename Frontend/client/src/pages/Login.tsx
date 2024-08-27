import React, { useState } from "react";
import "../styles/login.css"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/auth";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome"

interface User {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/Resources/hide.png"); 

  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const navigate =  useNavigate();



  const togglePasswordVisibility = (): void => {
    if (type === "password") {
      setIcon("/Resources/eye.png"); 
      setType("text"); 
    } else {
      setIcon("/Resources/hide.png"); 
      setType("password"); 
    }
  }

  // const toggleDropDown = (): void => {
  //   if (type === "password") {
  //     setIcon("<i class='fas fa-eye-slash'></i>"); 
  //     setType("text"); 
  //   } else {
  //     setIcon("<i class='fas fa-eye'></i>"); 
  //     setType("password"); 
  //   }
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, user );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      // toast.error("Something went wrong");
    }
  };

  return (
    <>
    
    <Toaster position="bottom-center" reverseOrder={false} />
    <main className="main">

      <div className="left">
        <img className="bgimg1" src="/Resources/Signin.png" alt="Logo" />
      </div>

    <div className="right">
      <div className="container1">
      
      <div className="heading"><h1 className="h1">Fill what we know <span> !</span> </h1> </div>
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
        <Link to={"/"}><button className="button1" >Sign Up</button></Link>
      </form>
      <br/>
      <Link to={"/send-otp"}><h2 className="h2">Forget Password <span>?</span></h2></Link>
    </div>
    </div>
    

  </main>
    </>


  );
};

export default LoginForm;

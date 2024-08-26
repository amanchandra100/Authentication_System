import React from 'react'
import { useAuth } from '../context/auth';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/home.css"

const Home = () => {

  const [auth, setAuth] = useAuth();
  const navigate= useNavigate()

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

      <h2>Wellcome to home</h2>
      </div>
      <div className="btns">
      <button className="btn-out" onClick={handlelogout} type="submit">Sign Out</button>
      <Link to={"/profile"}><button className="btn-out">Profile</button></Link>
      </div>
    
    </div>

    <div className='details-div'>
        <div className="details">
        <h1>See User Details in  Profile</h1>

        <br/>
       
        </div>
      </div>  
    
    </>
  )
}

export default Home

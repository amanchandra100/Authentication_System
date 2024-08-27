import React from 'react'
import { useAuth } from '../../context/auth';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import "../../styles/home.css"
import toast from 'react-hot-toast';

const Navbar = () => {


    const [auth, setAuth] = useAuth();
    const navigate= useNavigate()
    const location = useLocation()
    const path=location.pathname

    // const [searchParams] = useSearchParams();
    // const type = searchParams.get('type');
    // const name = searchParams.get('name');


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
    <nav  className="nav">
    <div className="logo-div">

    <h2>{auth?.user?(`Wellcome to Home`):("Wellcome")}</h2>
    </div>
    <div className="btns">
    {auth?.user? ( 
        <>
        <Link to={path ==="/profile" ?("/home"):("/profile")}><button className="btn-out">{path ==="/profile" ? ("Home"): ("Profile")}</button></Link>
        <button className="btn-out" onClick={handlelogout} type="submit">Sign Out</button>
        </>

    ):(  
        <>
        <Link to={"/home"}><button className="btn-out">Home</button></Link>
        <Link to={path ==="/login" ? ("/"): ("/login")}><button className="btn-out">{path ==="/login" ? ("Sign Up"): ("Sign In")}</button></Link>
        </>
     ) }
    </div>
  
  </nav>
  )
}

export default Navbar

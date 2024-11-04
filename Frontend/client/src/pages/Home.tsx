import React, { useState } from 'react'
import { useAuth } from '../context/auth';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/home.css"
// import ImageSlidingCard from '../components/ImageSlidingCard/ImageSlidingCard.tsx';
import ImageSlider from "../components/ImageSlidingCard/ImageSlider.tsx";

const Home = () => {

  const [auth, setAuth] = useAuth();
  const navigate= useNavigate()

  const [counter, setCounter] = useState(0)

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

function increase() {
  if (counter === images.length - 1 ) {
    return setCounter(0)

  }
     setCounter(counter +1) 
}

function decrease() {
  if (counter === 0 ) {
    return setCounter(images.length - 1)

  }
     setCounter(counter -1) 
}


   const images=[
    "https://images.pexels.com/photos/27108021/pexels-photo-27108021/free-photo-of-a-building-with-a-red-and-white-clock-on-it.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/15057524/pexels-photo-15057524/free-photo-of-group-of-cheerful-friends.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/20414673/pexels-photo-20414673/free-photo-of-birds-eye-view-of-ericeira-city-in-portugal.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/6658648/pexels-photo-6658648.png?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ]

  return (
    <>

    <h2>This is Demo Home Page Which is protected by Authentication means you can't access this page without login</h2>
    <div className="App">
      <h1>Image Slider</h1>
      {/* <ImageSlider images={images} /> */}
    </div>
    {/* <div className="App">
      <h1>Image Slider on Hover</h1>
      <ImageSlidingCard images={images} />
    </div> */}

    <div className="photo-div">
      <img className='imges' src={images[counter]} alt=""  />
    </div>
    <br/>
    <div className="btn-div">
      <button title='Previous' onClick={decrease}>Previous</button>
      <button title='Next' onClick={increase}>Next</button>
    </div>
    </>
  )
}

export default Home

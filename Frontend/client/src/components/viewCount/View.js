import React from "react";
import { useEffect, useState } from "react";
import "../styles/view.css"

const View = () => {
  const [views, setViews] = useState("");

 

  useEffect(() => { 
    const _id=process.env.REACT_APP_API_KEY
    const fetchCount = async () => {
    const res = await fetch(`https://viewapi.vercel.app/api/v1/viewsCount/${_id}`)
    .then((res) => res.json());
    setViews(res.count);
    };
    fetchCount();
  }, []);

  return (
    <div>
      <div className="viewDiv">
      <a title="Add views count in your Website" target="main" className="viewLink1" href="https://viewapi.vercel.app">
      <div className="countDiv">
        <h4 className="viewhead">
          This Page Was Viewed
          <span>👁️{views}</span>
          Times
        </h4>
      </div>  
      </a>
      </div>
    </div>
  );
};

export default View;

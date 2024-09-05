import React from "react";
import { useEffect, useState } from "react";
import "../styles/view.css"

const View = () => {
  const [views, setViews] = useState("");

 

  useEffect(() => { 
    const _id='66d9846569b4a99f90c84054'
    const fetchCount = async () => {
    const res = await fetch(`/api/v1/viewsCount/${_id}`)
    .then((res) => res.json());
    setViews(res.count);
    };
    fetchCount();
  }, []);

  return (
    <div>
      <div className="end1">
        <h4 className="viewhead">
          This Page Was Viewed
          <span>👁️{views}</span>
          Times
        </h4>
      </div>
    </div>
  );
};

export default View;

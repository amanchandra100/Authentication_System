import React from "react";
import { useEffect, useState } from "react";
import "../styles/view.css"

const View = () => {
  const [views, setViews] = useState("");

 

  useEffect(() => { 
    const fetchCount = async () => {
    const res = await fetch(`/api/v1/viewsCount`)
    .then((res) => res.json());
    setViews(res.data);
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

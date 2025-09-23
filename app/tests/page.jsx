

"use client"; // ← add this at the very top

import { useState, useEffect } from "react";
import axios from "axios";

const Testimonials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/testimonials").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.description}</p>
      ))}
    </div>
  );
};

export default Testimonials;

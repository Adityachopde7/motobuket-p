"use client";
import Homepage from './components/Homepage';
import Preloader from './components/Preloader';
import React, { useState, useEffect } from 'react';
import './globals.css'

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="transition-opacity duration-700">
      {loading ? <Preloader /> : <Homepage />}
    </div>
  );
}

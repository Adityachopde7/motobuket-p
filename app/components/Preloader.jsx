// src/components/Preloader.jsx
"use client";
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/loader.json'; // your Lottie JSON file

const Preloader = () => {
  return (
    <div style={styles.overlay}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000', // can change to your desired color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
};

export default Preloader;

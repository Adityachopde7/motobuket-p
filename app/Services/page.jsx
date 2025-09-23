"use client";
import React, { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carwash from "@/public/carwash.jpg";
import denting from "@/public/denting.webp";
import painter from "@/public/painter.jpg";
import bodywork from "@/public/bodywork.webp";
import extra1 from "@/public/extra1.jpg";
import extra2 from "@/public/extra2.jpg";
import Back from "@/components/back"





const ImageSlide = () => {
  // Array of placeholder image URLs
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kpv2Ttz-qC4Y3cekO9ipRviZdgXqjTst4A&s",
    "https://rcs2020.netlify.app/images/slider/slider-img-1.jpg",
    "https://www.shutterstock.com/shutterstock/videos/1078362656/preview/stock-footage-car-body-repair-car-dent-removal-techniques-a-auto-body-repair-man-removing-auto-body-dent-by-the.webm",
     "https://www.shutterstock.com/shutterstock/videos/21584968/preview/stock-footage-modern-car-paint-workshop.webm"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to navigate to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Automatic slider functionality with a timer
  useEffect(() => {
    const slideTimer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideTimer); // Cleanup on component unmount
  }, [currentSlide]);

  return (
    <>
    <div className="min-h-screen bg-gray-950 font-sans antialiased text-white py-16">
    
    <div className="relative w-full h-screen overflow-hidden">
    <Back />
      <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
      {/* Background images with fade transition */}
      {images.map((image, index) => {
        const isVideo = image.endsWith(".mp4") || image.endsWith(".webm");
        return isVideo ? (
          <video
            key={index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`}
            style={{
              opacity: currentSlide === index ? 1 : 0,
            }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={image} type={image.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${image})`,
              opacity: currentSlide === index ? 1 : 0,
            }}
          ></div>
        );
      })}

      {/* Hero content positioned above the images */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Our service
          </h1>
          <p className="text-lg sm:text-xl font-light">
            We offer a full range of services to keep your vehicle looking and performing its best.
          </p>
          <button className="px-8 py-4 bg-[#67D300] text-black text-lg font-bold rounded-full hover:bg-[#51A500] transition-colors shadow-lg transform hover:scale-105">
            Book a Service Now
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <button
          onClick={prevSlide}
          className="bg-gray-800/50 p-3 rounded-full text-white mx-4 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#67D300]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <button
          onClick={nextSlide}
          className="bg-gray-800/50 p-3 rounded-full text-white mx-4 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#67D300]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#67D300] w-6" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};


const ImageSlider = () => {
  const images = [
    { image: carwash, name: 'Vehicle Wash', description: 'From quick rinses to full interior detailing.' },
    { image: denting, name: 'Denting', description: 'Expert dent removal to restore your vehicle’s shape.' },
    { image: painter, name: 'Painting', description: 'High-quality paint jobs for a flawless finish.' },
    { image: bodywork, name: 'Bodywork', description: 'Comprehensive repairs and restoration for all damage.' },
    { image: extra1, name: 'Oil Change', description: 'Keep your engine running smoothly.' },
    { image: extra2, name: 'Wheel Alignment', description: 'Precision alignment for a smoother ride.' },
    // Add more if needed
  ];

  const itemsPerView = 4; // How many cards to show at once
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + 1 + itemsPerView > images.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev - 1 < 0 ? images.length - itemsPerView : prev - 1
    );
  };

  

  const visibleItems = images.slice(startIndex, startIndex + itemsPerView);

  // Handle wrap-around when slice goes beyond end
  const itemsToShow =
    visibleItems.length < itemsPerView
      ? [...visibleItems, ...images.slice(0, itemsPerView - visibleItems.length)]
      : visibleItems;

  return (
    <section className="py-20 bg-gray-950 text-white relative overflow-hidden mt-4">
      <div className="container mx-auto px-4 text-center text-[#67D300]">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          We offer a full range of services to keep your vehicle looking and performing its best.
        </p>

        {/* Grid of visible items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
          {itemsToShow.map((image, index) => (
            <div
              key={index}
              className="relative bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden"
              style={{
                backgroundImage: image.image ? `url(${image.image.src})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/60 rounded-xl"></div>

              <div className="relative z-10 flex flex-col justify-end h-full">
                <h3 className="text-xl font-semibold text-white text-left">{image.name}</h3>
                <p className="text-gray-300 text-left">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <button
          onClick={prevSlide}
          className="bg-gray-800/50 p-3 rounded-full text-white mx-4 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#67D300]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <button
          onClick={nextSlide}
          className="bg-gray-800/50 p-3 rounded-full text-white mx-4 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#67D300]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};




export default function app(){
  return(
  <><ImageSlide />
  <ImageSlider />
  <Navbar /><Footer /></>
  );
}
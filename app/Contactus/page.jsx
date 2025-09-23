"use client";
import React, { useState } from "react";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import Back from "@/components/back"

import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



// Lucide React icons for the contact details
// These are simple SVG components to keep the code self-contained
const MapPin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 18s-6-5.83-6-11c0-3.31 2.69-6 6-6s6 2.69 6 6c0 5.17-6 11-6 11z" />
    <circle cx="12" cy="7" r="2" />
  </svg>
);

const Phone = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z" />
    <path d="M18 10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
    <path d="M14 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Map = ({className }) =>(
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="30"
  height="30"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentcolor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className={className}
>
  <path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10z" />
  <circle cx="12" cy="11" r="2" />
</svg>
)

// --- ContactUs Component ---
const ContactUs = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone number to state
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log("Form submitted with data:", formData);
    // Here you could add a success message or clear the form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans antialiased text-white py-16">
      
      <div className="container mx-auto px-4">
        <Back />
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#67D300] mt-6">
            Contact Us
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-light text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Please fill out the form below or reach out to us directly.
          </p>
        </div>

        <div className="bg-gray-900 rounded-3xl p-10 sm:p-20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">Our Details</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#67D300] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p className="text-gray-400">123 Clean Street, Auto City, CA 90210, USA</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-[#67D300] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-gray-400">+1 (123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="text-[#67D300] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-gray-400">contact@motobukket.com</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-[#67D300] focus:border-transparent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-[#67D300] focus:border-transparent outline-none transition-colors"
                  />
                </div>
                {/* New phone number input field */}
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-[#67D300] focus:border-transparent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    required
                    rows="6"
                    className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-[#67D300] focus:border-transparent outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#67D300] text-black text-lg font-bold rounded-lg hover:bg-[#51A500] transition-colors shadow-lg"
                >
                  Send Message
                </button>
                
              </form>
            </div>
            
          </div>
          <iframe
                   src="https://maps.google.com/maps?width=700&amp;height=600&amp;hl=en&amp;q=octverse technology akola india&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className=" w-full mt-4 h-64 py-2 border-0 mx-auto"
            allowFullScreen
          >  </iframe>
        </div>
          
      </div>
 
    
                 
          </div>
  );
};

// Main App component to render the ContactUs page
export default function App() {
    return (
        <>
            <ContactUs />
             <Navbar /> 
              <Footer />
                  </>
    );
}

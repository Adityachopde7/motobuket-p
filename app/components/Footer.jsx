"use client";
import React from 'react'
import Link  from 'next/link';


const FacebookIcon = ({className}) =>(
<svg width="25" height="48" viewBox="0 0 24 24" role="img" aria-label="Facebook">
  className={className}
  <circle cx="12" cy="12" r="12" fill="#1877F2"/>
  <path d="M15.12 8.5h-1.49c-.37 0-.88.18-.88.96v1.12h2.37l-.31 2.42h-2.06V20h-2.5v-6.99H8.5v-2.42h1.73V9.35c0-1.71 1.04-2.97 2.82-2.97.83 0 1.54.06 1.94.09v2.03z" fill="#fff"/>
</svg>

);

const GoogleIcon = ({className}) =>(
  
<svg width="25" height="48" viewBox="0 0 48 48" role="img" aria-label="Google">
 className={className}
  <path fill="#4285F4" d="M24 9.5c3.9 0 6.5 1.7 8 3.2l5.8-5.6C34.8 3.5 30.9 1.5 24 1.5 14.9 1.5 7.7 6.9 4.7 14.4l6 4.7C12.4 13.6 17.6 9.5 24 9.5z"/>
  <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8h12.6c-.5 2.7-2.1 5-4.6 6.4l7.2 5.6C44.6 36.1 46.5 30.8 46.5 24.5z"/>
  <path fill="#FBBC05" d="M10.7 29.1A14.7 14.7 0 0 1 9 24.5c0-1.6.3-3.2.8-4.6l-6-4.7A24 24 0 0 0 1.5 24.5c0 3.9.9 7.6 2.6 10.9l6.6-6.3z"/>
  <path fill="#EA4335" d="M24 46.5c6.1 0 11.2-2 15-5.5l-7.2-5.6c-2 1.4-4.6 2.2-7.8 2.2-6.4 0-11.6-4.1-13.5-9.7l-6.6 6.3C7.7 41.6 14.9 46.5 24 46.5z"/>
</svg>

)

const TwitterIcon = ({className}) => (
 
<svg width="25" height="48" viewBox="0 0 24 24" role="img" aria-label="Twitter">
  className={className}
  <path fill="#1DA1F2" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.14 12.14 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.32 5.72 4.25 4.25 0 0 1-1.94-.54v.05c0 2.07 1.47 3.8 3.42 4.19a4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54 12.13 12.13 0 0 0 8.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.53A8.36 8.36 0 0 0 22.46 6z"/>
</svg>

)


export default function Footer() {
  
  return (
    <div>
        <footer className="bg-gray-950 text-gray-400 py-12">
     
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <img src='logo.png' alt="logo" className="h-10 w-auto" />
<div className="flex gap-4">
           <a href='www.facebook.com'> <FacebookIcon className="w-8 h-8" /></a>
            <a href='www.google.com'><GoogleIcon className="w-8 h-8" /></a>
            <a href='www.twitter.com'><TwitterIcon className="w-8 h-8" /></a>
          </div>

          <p>Your one-stop solution for all vehicle care needs. Get a sparkling clean and flawless finish every time.</p>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">Quick Links</h4>
           <ul className="space-y-2">
            <li><Link href="/Home" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/Services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/Aboutsus" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/Contactus" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/Admin" className="hover:text-white transition-colors">Admin</Link></li>
           
          </ul>
          
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">Contact Us</h4>
          <p>🏪:123 Vehicle Lane, Auto City, 54321</p>
          <p>📧: contact@motobukket.com</p>
          <p>📞: (123) 456-7890</p>
        </div>
      </div>
      <div className='container  mx-auto text-center mt-20 pt-8  border-t border-gray-800'>
        <a className=" hover:underline hover:text-blue-800" href='' >Terms & conditions</a>
        <span className='px-2'>  |  </span>
        <a  className=" hover:underline hover:text-blue-800" href='' >Privacy Policy</a>
        <span className='px-2'>  |  </span>
        <a className="hover:underline hover:text-blue-800" href='' >Disclaimer</a>
       <span className='px-2'>  |  </span>
        <a className=" hover:underline hover:text-blue-800" href='' >Refund Policy</a>
      </div>
      <div className="container mx-auto px-20 text-center mt-10 pt-8 border-t border-gray-800">
        <p>&copy; 2025 Motobuket. All rights reserved </p><p>❤️ Made By <a className=" hover:underline hover:text-blue-800" href=''>Octverse Technologies</a></p>
        
      </div>
      
    </footer>
      
    </div>
  )
}

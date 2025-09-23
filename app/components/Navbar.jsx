"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ Next.js router hooks
import logo from "@/public/logo.png";


export default function Navbar({ user, onGetStarted, onLogout }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current path
  const [isOpen, setIsOpen] = useState(false);

  const handleSignIn = () => router.push("/Signin");
  const toggleMenu = () => setIsOpen(!isOpen);

  const isOnUserboard = pathname === "/Userboard"; // ✅ Next.js equivalent

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/70 backdrop-blur-md text-white p-4 lg:p-6 rounded-b-xl shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
          <Image src={logo} alt="logo" className="h-10 w-auto" priority />
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <span className="px-4 py-2 text-white font-semibold">
                Hi, {user.name}
              </span>
              {isOnUserboard ? (
                <button
                  onClick={() => router.push("/Userview")}
                  className="px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
                >
                  Home
                </button>
              ) : (
                <button
                  onClick={() => router.push("/Userboard")}
                  className="px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className="px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="px-4 py-2 bg-[#67D300] text-black font-semibold rounded-lg hover:bg-[#51A500] transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 px-4">
          {user ? (
            <>
              <span className="px-4 py-2 text-white font-semibold">
                Hi, {user.name}
              </span>
              {isOnUserboard ? (
                <button
                  onClick={() => router.push("/Userview")}
                  className="w-full px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
                >
                  Home
                </button>
              ) : (
                <button
                  onClick={() => router.push("/Userboard")}
                  className="w-full px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-2 text-white border-2 border-[#67D300] rounded-lg hover:bg-[#67D300] hover:text-black transition-all"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="w-full px-4 py-2 bg-[#67D300] text-black font-semibold rounded-lg hover:bg-[#51A500] transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

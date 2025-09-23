"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import carMarker from "../assets/car.png"; // <-- replace with your car image path

const customMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

// 🔹 helper component to recenter map
function RecenterMap({ lat, lng }) {
  const map = useMap();
  map.setView([lat, lng], 15); // zoom in when clicking vendor
  return null;
}

// SVG Icons
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-black"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-black"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
  </svg>
);

export default function UserView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("pending");
  const [showVendors, setShowVendors] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const mapRef = useRef(null);
  const router = useRouter();

  const categories = [
    { name: "Interior Cleaning", icon: "🚗" },
    { name: "Exterior Wash", icon: "💦" },
    { name: "Full Detailing", icon: "✨" },
    { name: "Engine Bay Wash", icon: "🔧" },
    { name: "Ceramic Coating", icon: "🛡️" },
    { name: "Tire & Rim Care", icon: "🛞" },
    { name: "Headlight Restoration", icon: "💡" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/signin");
  };

  const handleGetStarted = () => {
    router.push("/signup");
  };

  const banners = [
    {
      img: "https://www.gaadizo.com/gaadizo-car-service-repairs/assets/media/components/b-main-slider/dent%20repairs.jpg",
      title: "Sparkling Clean",
      subtitle: "Get a professional wash from just ₹499",
      bgColor: "#000000",
    },
    {
      img: "https://www.gaadizo.com/gaadizo-car-service-repairs/assets/media/components/b-main-slider/dent%20repairs.jpg",
      title: "Interior Sanitization",
      subtitle: "Protect your family with a deep clean",
      bgColor: "#2D3748",
    },
    {
      img: "https://admin.idaoffice.org/wp-content/uploads/2019/02/%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D1%8F%D1%8F-9.jpg",
      title: "Ceramic Coating Deals",
      subtitle: "Long-lasting shine for your car's paint",
      bgColor: "#000000",
    },
  ];

  const vendors = [
    {
      name: "Eco-Shine Car Wash",
      rating: 4.8,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V1",
    },
    {
      name: "Speedy Detailing",
      rating: 4.5,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V2",
    },
    {
      name: "Clean Wheels Hub",
      rating: 4.9,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V3",
    },
    {
      name: "Quick & Clean",
      rating: 4.2,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V4",
    },
    {
      name: "Premier Auto Spa",
      rating: 4.7,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V5",
    },
    {
      name: "Detail Dynamics",
      rating: 4.6,
      imageUrl: "https://placehold.co/100x100/A0E7A0/000?text=V6",
    },
  ];

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus("granted");
        },
        () => setLocationStatus("denied")
      );
    } else setLocationStatus("denied");
  };

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % banners.length),
      5000
    );
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleBookNow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus("granted");
          router.push("/Carwashingbooking");
        },
        () => setLocationStatus("denied")
      );
    } else {
      setLocationStatus("denied");
    }
  };

  const handleVendorClick = (vendor) => {
    router.push(`/Vendorprofile?name=${vendor.name}&rating=${vendor.rating}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white pt-20">
      {/* Navbar */}
      <Navbar
        user={user}
        onGetStarted={handleGetStarted}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="flex-grow">
        {/* Categories */}
        <section className="flex items-center justify-between p-4 bg-gray-900 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center mx-4 my-2 text-center text-gray-300 hover:text-white cursor-pointer"
            >
              <div className="text-4xl">{c.icon}</div>
              <span className="text-sm mt-1">{c.name}</span>
            </div>
          ))}
        </section>

        {/* Banner slider */}
        <section className="p-4 md:p-8 lg:p-12">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative flex items-center justify-center h-64 md:h-80 lg:h-96 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${banner.img})`,
                      backgroundColor: banner.bgColor,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 animate-slideUp">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl font-medium animate-fadeIn">
                      {banner.subtitle}
                    </p>
                    <button
                      onClick={handleBookNow}
                      className="mt-4 py-2 px-6 rounded-full bg-green-500 hover:bg-green-600 transition-all shadow-lg animate-bounce"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + banners.length) % banners.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % banners.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRightIcon />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white scale-125"
                      : "bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Location Services */}
        <section className="p-4 md:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-500">
            Services Near You
          </h2>

          {locationStatus === "pending" && (
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Allow location access to find services near you.
              </p>
              <button
                onClick={getUserLocation}
                className="py-2 px-6 text-black font-semibold rounded-md bg-green-500 hover:bg-green-600 transition-colors"
              >
                Enable Location
              </button>
            </div>
          )}

          {locationStatus === "granted" && userLocation && (
            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={14}
                className="h-full w-full"
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                {/* User marker */}
                <Marker
                  position={[userLocation.latitude, userLocation.longitude]}
                  icon={customMarker}
                >
                  <Popup>You are here 🚗</Popup>
                </Marker>

                {/* Vendor markers */}
                {vendors.map((v, i) => {
                  const lat =
                    userLocation.latitude + (Math.random() - 0.5) * 0.02;
                  const lng =
                    userLocation.longitude + (Math.random() - 0.5) * 0.02;

                  const vendorIcon = new L.Icon({
                    iconUrl: v.imageUrl,
                    iconSize: [50, 50],
                    className:
                      "rounded-full border-2 border-green-500 shadow-lg bg-white",
                  });

                  return (
                    <Marker key={i} position={[lat, lng]} icon={vendorIcon}>
                      <Popup>
                        <div className="text-center">
                          <img
                            src={carMarker}
                            alt={v.name}
                            className="w-16 h-16 mx-auto rounded-full mb-2"
                          />
                          <strong>{v.name}</strong>
                          <br />⭐ {v.rating}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}

                {selectedVendor && (
                  <RecenterMap
                    lat={selectedVendor.lat}
                    lng={selectedVendor.lng}
                  />
                )}
              </MapContainer>
            </div>
          )}

          {locationStatus === "denied" && (
            <div className="bg-gray-900 rounded-lg p-6 shadow-md text-center">
              <p className="text-red-500 text-xl font-semibold mb-2">
                Location Access Denied
              </p>
              <p className="text-gray-400">
                Please enable location services in your browser settings to find
                services near you.
              </p>
              <button
                onClick={getUserLocation}
                className="mt-4 py-2 px-6 text-black font-semibold rounded-md bg-green-500 hover:bg-green-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </section>

        {/* Top Vendors */}
        <section className="p-4 md:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-500">
            Top Vendors
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {vendors.map((v) => (
              <div
                key={v.name}
                onClick={() => handleVendorClick(v)}
                className="flex-shrink-0 w-48 bg-gray-900 rounded-xl p-4 text-center shadow-lg cursor-pointer"
              >
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-500"
                />
                <h3 className="text-lg font-semibold mt-3 text-white">
                  {v.name}
                </h3>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="ml-1 text-gray-300">{v.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

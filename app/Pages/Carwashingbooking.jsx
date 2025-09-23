"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      fullDate: d.toISOString().split("T")[0],
    });
  }
  return days;
};

export default function CarWashBooking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]); // 🔹 fetched vendors
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Fetch vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("http://localhost:2000/api/vendors");
        const data = await res.json();
        if (data && data.length > 0) {
          setVendors(data);
        }
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        setLoadingVendors(false);
      }
    };

    fetchVendors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/signin";
  };

  const dates = getNext7Days();

  // Google Maps Setup
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_KEY || "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const filteredVendors = vendors.filter((v) =>
    vendorSearch
      ? (v.name || "").toLowerCase().includes(vendorSearch.toLowerCase())
      : true
  );

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot || !selectedVendor) {
      alert("Please select date, slot and vendor!");
      return;
    }
    if (!user) {
      alert("User not logged in!");
      return;
    }

    const booking = {
      date: selectedDate,
      slot: selectedSlot,
      name: user.name,
      phone: user.phone,
      vehicle: user.vehicle,
      vendor: selectedVendor.name,
      location: selectedVendor.location,
    };

    try {
      // Get auth token
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to make a booking!");
        return;
      }

      // Transform booking data to match server expectations
      const serverBookingData = {
        VendorId: selectedVendor.id,
        ServiceType: "Car Wash",
        BookingDate: selectedDate,
        BookingTime: selectedSlot,
      };

      // Save booking in backend
      const response = await fetch("http://localhost:2000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serverBookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }

      const result = await response.json();
      localStorage.setItem("carwash_booking", JSON.stringify(booking));
      alert("Booking Confirmed ✅");
    } catch (err) {
      console.error("Booking error:", err);
      alert(`Booking failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar on top */}
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex justify-center min-h-screen pt-20">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Car Wash Slot Booking
          </h2>

          {/* Vendor Search */}
          <input
            type="text"
            placeholder="Search Vendor..."
            className="w-full mb-3 p-3 border rounded-lg"
            value={vendorSearch}
            onChange={(e) => setVendorSearch(e.target.value)}
          />

          <div className="mb-6 max-h-40 overflow-y-auto border rounded-lg">
            {loadingVendors ? (
              <p className="p-3 text-gray-500">Loading vendors...</p>
            ) : filteredVendors.length > 0 ? (
              filteredVendors.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVendor(v)}
                  className={`block w-full text-left p-3 border-b hover:bg-gray-100 ${
                    selectedVendor?.id === v.id ? "bg-[#67D300] font-bold" : ""
                  }`}
                >
                  {v.name}{" "}
                  <span className="text-sm text-gray-600">({v.location})</span>
                </button>
              ))
            ) : (
              <p className="p-3 text-gray-500">No vendors found</p>
            )}
          </div>

          {/* Google Map */}
          <div className="w-full h-64 mb-6 border rounded-lg overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                center={{ lat: 18.5204, lng: 73.8567 }}
                zoom={12}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                {vendors.map((v, i) => (
                  <Marker
                    key={i}
                    position={{ lat: v.lat, lng: v.lng }}
                    onClick={() => setSelectedVendor(v)}
                  />
                ))}
                {selectedVendor?.lat && selectedVendor?.lng && (
                  <InfoWindow
                    position={{
                      lat: selectedVendor.lat,
                      lng: selectedVendor.lng,
                    }}
                    onCloseClick={() => setSelectedVendor(null)}
                  >
                    <div>
                      <h4 className="font-bold">{selectedVendor.name}</h4>
                      <p>{selectedVendor.location}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : (
              <p className="p-4 text-center text-gray-500">Loading map...</p>
            )}
          </div>

          {/* Date Selection */}
          <div className="flex space-x-3 overflow-x-auto pb-4 mb-6">
            {dates.map((d) => (
              <button
                key={d.fullDate}
                onClick={() => setSelectedDate(d.fullDate)}
                className={`flex flex-col items-center min-w-[70px] p-3 rounded-xl border 
                  ${
                    selectedDate === d.fullDate
                      ? "bg-[#67D300] text-black font-bold"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span className="text-sm">{d.day}</span>
                <span className="text-lg">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <h3 className="text-lg font-semibold mb-2">Select Time Slot</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg border transition 
                  ${
                    selectedSlot === slot
                      ? "bg-[#67D300] text-black font-bold border-black"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Booking Summary */}
          {selectedDate && selectedSlot && (
            <div className="bg-gray-50 border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">
                Booking Summary
              </h4>
              <p>
                <strong>Vendor:</strong>{" "}
                {selectedVendor?.name || "Not selected"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {selectedVendor?.location || "Not selected"}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedSlot}
              </p>
              <p>
                <strong>Name:</strong> {user?.name || "Not available"}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone || "Not available"}
              </p>
              <p>
                <strong>Vehicle:</strong> {user?.vehicle || "Not available"}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleBooking}
            className="w-full bg-[#67D300] text-black p-4 rounded-xl font-bold text-lg hover:bg-[#51A500] transition"
          >
            Confirm Booking
          </button>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

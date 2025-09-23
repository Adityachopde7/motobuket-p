"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- SVG Icons from Lucide React
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const CarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z" />
    <circle cx="7" cy="15" r="2" />
    <circle cx="17" cy="15" r="2" />
  </svg>
);
const HistoryIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v6l2.5-2.5M12 22v-6l-2.5 2.5" />
    <path d="M12 2a10 10 0 1 0 0 20" />
  </svg>
);
const WalletIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16v-5" />
    <rect width="21" height="15" x="3" y="5" rx="2" />
    <path d="M19 19v-2" />
  </svg>
);
const AwardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M12 2a6 6 0 0 1 6 6v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a6 6 0 0 1 6-6z" />
  </svg>
);
const TicketIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-2 6-2 6 2 6 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
    <path d="M16 12s-3-2-6-2-6 2-6 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2z" />
    <path d="M16 12v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2z" />
  </svg>
);
const HelpCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.8 1c0 2-3 2-3 2" />
    <path d="M12 17h.01" />
  </svg>
);
const GiftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="8" width="18" height="4" rx="1" ry="1" />
    <path d="M12 8v13M19 12v9" />
    <path d="M5 12v9" />
    <path d="M12 8a4 4 0 0 0-4-4H6a2 2 0 0 0-2 2" />
    <path d="M12 8a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2" />
  </svg>
);
const CopyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// New Icons for Help & Support
const BookOpenIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const CalendarCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
    <path d="M16 19l2 2 4-4" />
  </svg>
);
const CreditCardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="22" height="16" x="1" y="4" rx="2" />
    <path d="M1 10h22" />
  </svg>
);
const CarFrontIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 2a2 2 0 0 0-2 2v3H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-3h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3V4a2 2 0 0 0-2-2h-3z" />
    <path d="M7 17v-2a6 6 0 0 1 6-6h4" />
    <line x1="12" x2="17" y1="12" y2="17" />
    <line x1="17" x2="12" y1="12" y2="17" />
  </svg>
);
const ArrowUpRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 7L17 17M17 7L7 17" />
  </svg>
);
const ShieldCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21.35C12 21.35 15.65 19.33 18.25 15.68C19.78 13.56 20.25 10.95 20.25 8.94C20.25 6.94 18.42 4.96 15.5 4.96C14.07 4.96 12.87 5.61 12 6.55C11.13 5.61 9.93 4.96 8.5 4.96C5.58 4.96 3.75 6.94 3.75 8.94C3.75 10.95 4.22 13.56 5.75 15.68C8.35 19.33 12 21.35 12 21.35Z" />
    <path d="M8 12L10 14L16 8" />
  </svg>
);
const MessageSquareIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ProfileSection = ({ userId }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get token from localStorage (or wherever you store it after login)
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const response = await fetch("http://localhost:2000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // send token
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile data.");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Error: Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []); // no need for [userId], backend identifies user via token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleUpdate = async () => {
    if (!token) {
      setMessage("Error: User not authenticated.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:2000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, ...(profile || {}) }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update profile.");
      }

      const result = await response.json();
      setMessage(result.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-400">Loading profile...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h2>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.UserName}
            onChange={handleChange}
            className="p-3 border rounded-lg bg-gray-50 focus:border-[#67D300] outline-none"
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              name="email"
              value={profile.EMail}
              onChange={handleChange}
              className="flex-1 p-3 border rounded-lg bg-gray-50 focus:border-[#67D300] outline-none"
              placeholder="Email Address"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
              Verify
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="tel"
              name="phone"
              value={profile.UserPhoneNumber}
              onChange={handleChange}
              className="flex-1 p-3 border rounded-lg bg-gray-50 focus:border-[#67D300] outline-none"
              placeholder="Phone Number"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
              Verify
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-gray-50 focus:border-[#67D300] outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="p-3 border rounded-lg bg-gray-50 focus:border-[#67D300] outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={handleUpdate}
        disabled={isLoading}
        className="mt-8 w-full py-3 bg-[#67D300] text-black font-bold rounded-lg hover:bg-[#51A500] transition-colors disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm text-center ${
            message.startsWith("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

const VehiclesSection = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    license: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToRemove, setVehicleToRemove] = useState(null);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vehicles?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch vehicles.");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setMessage("Error: Failed to load vehicles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [userId]);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...newVehicle }),
      });
      if (!response.ok) throw new Error("Failed to add vehicle.");
      setNewVehicle({ make: "", model: "", year: "", license: "" });
      await fetchVehicles();
      setMessage("Vehicle added successfully!");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setMessage("Error: Failed to add vehicle.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRemoveVehicle = (id) => {
    setVehicleToRemove(id);
    setIsModalOpen(true);
  };

  const handleRemoveVehicle = async () => {
    if (!vehicleToRemove) return;
    setIsModalOpen(false);
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/vehicles/${vehicleToRemove}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error("Failed to remove vehicle.");
      await fetchVehicles();
      setMessage("Vehicle removed successfully!");
    } catch (error) {
      console.error("Error removing vehicle:", error);
      setMessage("Error: Failed to remove vehicle.");
    } finally {
      setVehicleToRemove(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 ">Your Vehicles</h2>
      <div className="text-3xl font-bold text-gray-800 mb-6 ">🚘</div>

      {/*           
            <form onSubmit={handleAddVehicle} className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Add New Vehicle</h3>
                <input type="text" name="make" value={newVehicle.make} onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))} placeholder="Make (e.g., Honda)" required className="w-full p-3 border rounded-lg focus:border-[#67D300] outline-none" />
                <input type="text" name="model" value={newVehicle.model} onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))} placeholder="Model (e.g., Civic)" required className="w-full p-3 border rounded-lg focus:border-[#67D300] outline-none" />
                <input type="text" name="year" value={newVehicle.year} onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))} placeholder="Year (e.g., 2020)" required className="w-full p-3 border rounded-lg focus:border-[#67D300] outline-none" />
                <input type="text" name="license" value={newVehicle.license} onChange={(e) => setNewVehicle(prev => ({ ...prev, license: e.target.value }))} placeholder="License Plate" required className="w-full p-3 border rounded-lg focus:border-[#67D300] outline-none" />
                <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#67D300] text-black font-bold rounded-lg hover:bg-[#51A500] transition-colors disabled:opacity-50">
                    {isLoading ? 'Adding...' : 'Add Vehicle'}
                </button>
            </form> */}

      {/* <div>
                <h3 className="text-xl font-semibold mb-4">Saved Vehicles</h3>
                {isLoading ? (
                    <div className="text-center text-gray-400">Loading vehicles...</div>
                ) : vehicles.length === 0 ? (
                    <div className="text-center text-gray-500">No vehicles added yet.</div>
                ) : (
                    <div className="space-y-4">
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
                                <div>
                                    <p className="font-semibold text-lg">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                                    <p className="text-sm text-gray-500">License: <span className="font-bold text-gray-700">{vehicle.license}</span></p>
                                </div>
                                <button onClick={() => confirmRemoveVehicle(vehicle.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
      {/* {message && (
                <div className={`mt-4 p-3 rounded-lg text-sm text-center ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )} */}

      {/* {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Confirm Removal</h3>
                        <p className="mb-6">Are you sure you want to remove this vehicle?</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
                            <button onClick={handleRemoveVehicle} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
                        </div>
                    </div>
                </div>
            )} */}
    </div>
  );
};

const ServiceHistorySection = () => (
  <Placeholder
    title="Service History"
    content="View your past service bookings and completed jobs here."
  />
);

const PaymentMethodsSection = () => {
  const paymentMethods = [
    { name: "Credit/Debit Card", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Apple Pay", icon: "🍏" },
  ];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Methods</h2>
      <p className="text-gray-600 mb-6">Manage your saved payment options.</p>
      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <span className="text-2xl">{method.icon}</span>
            <p className="font-semibold text-lg flex-1">{method.name}</p>
            <button className="text-blue-500 hover:underline">Manage</button>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-3 bg-[#67D300] text-black font-bold rounded-lg hover:bg-[#51A500] transition-colors">
        Add New Payment Method
      </button>
    </div>
  );
};

const SubscriptionsSection = () => {
  const plans = [
    {
      id: "quarterly",
      name: "Quarterly Plan",
      price: "$99",
      duration: "3 months",
      features: ["12 Car Washes"],
    },
    {
      id: "six-month",
      name: "Six-Month Plan",
      price: "$180",
      duration: "6 months",
      features: ["24 Car Washes", "1 Free Wax"],
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "$350",
      duration: "12 months",
      features: [
        "Unlimited Car Washes",
        "2 Free Waxes",
        "2 Detailing Services",
      ],
    },
  ];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Subscription Plans
      </h2>
      <p className="text-gray-600 mb-6">
        Subscribe to a plan for regular car wash services and more!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-100 p-6 rounded-lg border border-gray-200 text-center"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold text-[#67D300] mb-2">
              {plan.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center justify-center">
                  <span className="text-green-500 mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-[#67D300] text-black font-bold rounded-lg hover:bg-[#51A500] transition-colors">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CouponsSection = () => {
  const coupons = [
    {
      code: "FLAT20OFF",
      description: "Flat 20% off on any service.",
      status: "Available",
    },
    {
      code: "SAVE100",
      description: "Flat ₹100 off on services over ₹500.",
      status: "Available",
    },
    {
      code: "FREEDETAIL",
      description: "Get a free interior detailing with a full service.",
      status: "Used",
    },
    {
      code: "WASH50",
      description: "50% off your next car wash.",
      status: "Expired",
    },
  ];
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Coupons</h2>
      <p className="text-gray-600 mb-6">
        Here are your available and used coupons. You can apply them at
        checkout.
      </p>
      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
              coupon.status === "Available" ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <div>
              <p className="font-bold text-lg">{coupon.code}</p>
              <p className="text-sm text-gray-600">{coupon.description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                coupon.status === "Available"
                  ? "bg-green-500 text-white"
                  : coupon.status === "Used"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {coupon.status}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors">
        Redeem a New Coupon
      </button>
    </div>
  );
};

const ReferAndEarnSection = ({ userId }) => {
  const [referralCode, setReferralCode] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const referralRewards = [
    { name: "John D.", status: "Signed Up", reward: "₹50", date: "2024-03-15" },
    {
      name: "Jane A.",
      status: "First Service Booked",
      reward: "₹150",
      date: "2024-03-20",
    },
    {
      name: "Peter S.",
      status: "Signed Up",
      reward: "₹50",
      date: "2024-04-01",
    },
  ];

  useEffect(() => {
    const generatedCode = `${userId}-REFER`;
    setReferralCode(generatedCode);
  }, [userId]);

  const handleCopy = () => {
    const el = document.createElement("textarea");
    el.value = referralCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Refer & Earn</h2>
      <p className="text-gray-600 mb-6">
        Share your unique referral code with friends and earn rewards when they
        sign up and use our services!
      </p>

      <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold mb-2">Your Referral Code</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 p-3 rounded-lg font-mono text-lg text-gray-800 truncate">
            {referralCode}
          </div>
          <button
            onClick={handleCopy}
            className="p-3 bg-[#67D300] text-black rounded-lg hover:bg-[#51A500] transition-colors"
          >
            <CopyIcon className="w-5 h-5" />
          </button>
        </div>
        {copySuccess && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            {copySuccess}
          </p>
        )}
        <button className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
          Share Code
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          How it works
        </h3>
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#67D300] text-black font-bold flex items-center justify-center">
              1
            </span>
            <p>Share your unique code with a friend.</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#67D300] text-black font-bold flex items-center justify-center">
              2
            </span>
            <p>
              Your friend gets a discount on their first service when they sign
              up and use your code.
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#67D300] text-black font-bold flex items-center justify-center">
              3
            </span>
            <p>You earn a reward after their first completed booking!</p>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Referral Rewards
        </h3>
        {referralRewards.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referralRewards.map((reward, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reward.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reward.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reward.reward}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reward.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No referrals yet. Start sharing your code!
          </div>
        )}
      </div>
    </div>
  );
};

const HelpAndSupportSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "support", text: "Hi there! How can I help you today?" },
    { id: 2, sender: "user", text: "I have a question about my booking." },
  ]);
  const [input, setInput] = useState("");

  const topics = [
    { name: "Service Categories", icon: BookOpenIcon, action: () => {} },
    { name: "Service Booking", icon: CalendarCheckIcon, action: () => {} },
    { name: "Payment Options", icon: CreditCardIcon, action: () => {} },
    { name: "Car Accessories", icon: CarFrontIcon, action: () => {} },
    {
      name: "Escalation and Feedback",
      icon: ArrowUpRightIcon,
      action: () => {},
    },
    { name: "Network Warranty", icon: ShieldCheckIcon, action: () => {} },
    {
      name: "Chat Support",
      icon: MessageSquareIcon,
      action: () => setIsChatOpen(true),
    },
  ];

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input.trim(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
    // Simulate a support response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "support",
          text: "Thank you for your message. A support agent will be with you shortly!",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h2>
      <p className="text-gray-600 mb-6">
        Browse our help topics or start a chat with our support team.
      </p>
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={topic.action}
            className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 font-medium w-full text-left"
          >
            <topic.icon className="w-5 h-5 text-gray-500" />
            <span>{topic.name}</span>
          </button>
        ))}
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full flex flex-col h-full md:h-2/3">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">Chat Support</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-xs ${
                      msg.sender === "user"
                        ? "bg-[#67D300] text-black"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 flex items-center space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 p-3 border rounded-full bg-gray-50 focus:border-[#67D300] outline-none"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#67D300] text-black font-semibold rounded-lg hover:bg-[#51A500] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Placeholder = ({ title, content }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600">{content}</p>
  </div>
);

const App = () => {
  const [userId, setUserId] = useState("user-123-demo");
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    {
      id: "profile",
      name: "User Profile",
      icon: UserIcon,
      component: ProfileSection,
    },
    {
      id: "vehicles",
      name: "My Vehicles",
      icon: CarIcon,
      component: VehiclesSection,
    },
    {
      id: "service-history",
      name: "Service History",
      icon: HistoryIcon,
      component: ServiceHistorySection,
    },
    {
      id: "payment-methods",
      name: "Payment Methods",
      icon: WalletIcon,
      component: PaymentMethodsSection,
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      icon: AwardIcon,
      component: SubscriptionsSection,
    },
    {
      id: "coupons",
      name: "Coupons",
      icon: TicketIcon,
      component: CouponsSection,
    },
    {
      id: "help",
      name: "Help & Support",
      icon: HelpCircleIcon,
      component: HelpAndSupportSection,
    },
    {
      id: "refer",
      name: "Refer & Earn",
      icon: GiftIcon,
      component: ReferAndEarnSection,
    },
  ];

   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  const CurrentComponent = sections.find(
    (s) => s.id === activeSection
  )?.component;
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/signin"; // redirect after logout
  };

   return (
  <div className="bg-gray-100 font-sans">
    {/* 1. Navbar is placed at the top, outside the main content flex container */}
    <Navbar user={user} onLogout={handleLogout} />

    {/* 2. This new div now correctly handles the layout for the sidebar and content */}
    <div className="flex flex-col lg:flex-row min-h-screen pt-20">
      <aside className="lg:w-64 bg-white border-r border-gray-200 shadow-md p-6 flex flex-col items-center lg:items-start lg:min-h-screen">
        <div className="flex items-center mb-10 w-full">
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
        </div>
        <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 w-full overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-[#67D300] text-black font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="whitespace-nowrap">{section.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        {CurrentComponent && <CurrentComponent userId={userId} />}
        <Footer />
      </main>
    </div>
  </div>
);

};

export default App;

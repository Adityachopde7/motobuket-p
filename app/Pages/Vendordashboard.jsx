"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- SVG Icons ---
const LayoutDashboardIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>);
const CalendarDaysIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>);
const WrenchIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>);
const CircleDollarSignIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>);
const UserIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const ClockIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const LogOutIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>);
const CheckCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>);
const XCircleIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>);


// --- Mock Data ---
const MOCK_VENDOR = { name: "Kia", email: "contact@proautowash.com" };
const MOCK_INITIAL_BOOKINGS = [
  { id: 1, userName: "Alicia Keys", service: "Premium Car Wash", date: "2025-09-15", time: "14:00", status: "Confirmed" },
  { id: 2, userName: "Ben Affleck", service: "Interior Detailing", date: "2025-09-16", time: "11:30", status: "Pending" },
  { id: 3, userName: "Charlie Puth", service: "Full Service", date: "2025-09-16", time: "16:00", status: "Completed" },
  { id: 4, userName: "Diana Ross", service: "Standard Wash", date: "2025-09-17", time: "10:00", status: "Cancelled" },
];

// --- Section Components ---

const BookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBookings(MOCK_INITIAL_BOOKINGS);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Real-time notification simulation
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const newBooking = { id: Math.random(), userName: "Eva Mendes", service: "Headlight Restoration", date: "2025-09-20", time: "15:00", status: "Pending" };
      setBookings((prev) => [newBooking, ...prev]);
      setNewNotification(`New booking for ${newBooking.service} from ${newBooking.userName}`);
      setTimeout(() => setNewNotification(null), 5000);
    }, 15000);
    return () => clearInterval(notificationInterval);
  }, []);

  const handleUpdateStatus = useCallback((bookingId, newStatus) => {
    setBookings(currentBookings =>
      currentBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
  }, []);

  const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-flex items-center";
    const statusStyles = {
        Pending: "bg-yellow-100 text-yellow-800",
        Confirmed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
        Completed: "bg-blue-100 text-blue-800",
    };
    return <span className={`${baseClasses} ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  const BookingCard = ({ booking, onUpdateStatus }) => (
    <li className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <p className="font-semibold text-lg text-gray-800">{booking.service}</p>
                <div className="flex items-center text-gray-500 mt-2 text-sm">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>{booking.userName}</span>
                </div>
                <div className="flex items-center text-gray-500 mt-1 text-sm">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{booking.date} at {booking.time}</span>
                </div>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end w-full sm:w-auto">
                <StatusBadge status={booking.status} />
                {booking.status === "Pending" && (
                    <div className="flex space-x-2 mt-3">
                        <button onClick={() => onUpdateStatus(booking.id, 'Confirmed')} className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors">Accept</button>
                        <button onClick={() => onUpdateStatus(booking.id, 'Cancelled')} className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">Decline</button>
                    </div>
                )}
            </div>
        </div>
    </li>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Bookings</h2>
        <p className="text-gray-500 mb-6">Review and update customer appointments.</p>

         {newNotification && (
          <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="w-6 h-6 mr-3" />
              <p>{newNotification}</p>
            </div>
            <button onClick={() => setNewNotification(null)} className="text-green-600 hover:text-green-800">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {isLoading ? (
            <div className="text-center text-gray-400 p-10">Loading bookings...</div>
        ) : bookings.length === 0 ? (
            <div className="text-center text-gray-500 p-10">No bookings yet.</div>
        ) : (
            <ul className="space-y-4">
              {bookings.map((b) => <BookingCard key={b.id} booking={b} onUpdateStatus={handleUpdateStatus} />)}
            </ul>
        )}
    </div>
  );
};


// --- Main Dashboard Component ---

export default function Vendordashboard() {
  const [activeSection, setActiveSection] = useState("Bookings");
  const [vendor] = useState(MOCK_VENDOR);

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon },
    { name: "Bookings", icon: CalendarDaysIcon },
    { name: "Services", icon: WrenchIcon },
    { name: "Earnings", icon: CircleDollarSignIcon },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Bookings": return <BookingsSection />;
      case "Dashboard": // Fallthrough to default for now
      case "Services":
      case "Earnings":
      default: return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800">{activeSection}</h2>
          <p className="mt-4 text-gray-600">This section is under construction.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col">
        <div className="h-20 flex items-center justify-center border-b">
          <div className="text-center">
            <h2 className="font-bold text-xl text-gray-800">{vendor.name}</h2>
            <p className="text-xs text-gray-500">Vendor Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={`w-full flex items-center px-4 py-3 text-left text-md font-medium rounded-lg transition-colors duration-200 ${
                activeSection === item.name
                  ? "bg-[#67D300] text-black"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t">
             <button className="w-full flex items-center px-4 py-3 text-left text-md font-medium rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                <LogOutIcon className="w-6 h-6 mr-3"/>
                <span>Logout</span>
             </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}


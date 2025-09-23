"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Store, BarChart2, Ticket, List, FileText, Menu, X, PlusCircle, CheckCircle, Search, User, FileX, MessageCircle, TrendingUp, Eye, FileDown, Globe, LogOut } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';
const API_KEY = 'your-super-secret-api-key'; // This should also be in a secure location in a real app

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedVendorDoc, setSelectedVendorDoc] = useState(null);
  const [rejectionRemark, setRejectionRemark] = useState('');
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });
  const [newPlan, setNewPlan] = useState({ name: '', price: '', features: '' });

  // Data states
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [policies, setPolicies] = useState({});
  const [activePolicyTab, setActivePolicyTab] = useState('terms');
  const [policySaved, setPolicySaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Static/Mock Analytics Data (for demonstration)
  const dailyTraffic = [1500, 1800, 2200, 1900, 2500, 2100, 2800];
  const weeklyOrders = 80;
  const monthlyOrders = 320;
  const userGrowthThisMonth = 25;
  const vendorGrowthThisMonth = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersRes = await fetch(`${API_BASE_URL}/users`, { headers: { 'x-api-key': API_KEY } });
      const vendorsRes = await fetch(`${API_BASE_URL}/vendors`, { headers: { 'x-api-key': API_KEY } });
      const couponsRes = await fetch(`${API_BASE_URL}/coupons`, { headers: { 'x-api-key': API_KEY } });
      const plansRes = await fetch(`${API_BASE_URL}/subscription-plans`, { headers: { 'x-api-key': API_KEY } });
      const policiesRes = await fetch(`${API_BASE_URL}/policies`, { headers: { 'x-api-key': API_KEY } });

      const usersData = await usersRes.json();
      const vendorsData = await vendorsRes.json();
      const couponsData = await couponsRes.json();
      const plansData = await plansRes.json();
      const policiesData = await policiesRes.json();

      setUsers(usersData);
      setVendors(vendorsData);
      setCoupons(couponsData);
      setSubscriptionPlans(plansData);
      setPolicies(policiesData);

    } catch (error) {
      console.error('Failed to fetch data from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // API update functions
  const handleApprove = async (id, type) => {
    try {
      await fetch(`${API_BASE_URL}/${type}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      fetchData(); // Refresh data after update
    } catch (e) {
      console.error("Error approving item: ", e);
    }
  };

  const handleApproveDocs = async () => {
    try {
      await fetch(`${API_BASE_URL}/vendors/${selectedVendorDoc.id}/docs-approved`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ docsApproved: true }),
      });
      closeModals();
      fetchData();
    } catch (e) {
      console.error("Error approving docs: ", e);
    }
  };

  const handleRejectDocs = async () => {
    try {
      await fetch(`${API_BASE_URL}/vendors/${selectedVendorDoc.id}/docs-approved`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ docsApproved: false, rejectionRemark: rejectionRemark }),
      });
      closeModals();
      fetchData();
    } catch (e) {
      console.error("Error rejecting docs: ", e);
    }
  };

  const handleGenerateCoupon = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(newCoupon),
      });
      setNewCoupon({ code: '', discount: '' });
      fetchData();
    } catch (e) {
      console.error("Error generating coupon: ", e);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/subscription-plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(newPlan),
      });
      setNewPlan({ name: '', price: '', features: '' });
      fetchData();
    } catch (e) {
      console.error("Error creating plan: ", e);
    }
  };

  const handleSavePolicy = async () => {
    const updatedPolicy = {};
    updatedPolicy[activePolicyTab] = policies[activePolicyTab];

    try {
      await fetch(`${API_BASE_URL}/policies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(updatedPolicy),
      });
      setPolicySaved(true);
      setTimeout(() => setPolicySaved(false), 3000);
      fetchData();
    } catch (e) {
      console.error("Error saving policy: ", e);
    }
  };

  // UI state management
  const closeModals = () => {
    setIsProfileModalOpen(false);
    setIsDocsModalOpen(false);
    setSelectedUser(null);
    setSelectedVendorDoc(null);
    setRejectionRemark('');
  };

  const handleViewProfile = (item, type) => {
    setSelectedUser({ ...item, type });
    setIsProfileModalOpen(true);
  };

  const handleViewDocs = (vendor) => {
    setSelectedVendorDoc(vendor);
    setIsDocsModalOpen(true);
  };

  const ProfileModal = ({ item, onClose }) => {
    if (!item) return null;
    const isUser = item.type === 'user';
    const title = isUser ? 'User Profile' : 'Vendor Profile';
    const profileFields = isUser
      ? [
        { label: 'Name', value: item.name },
        { label: 'Email', value: item.email },
        { label: 'Phone', value: item.phone },
        { label: 'Status', value: item.status },
        { label: 'Registration Date', value: item.registration_date },
      ]
      : [
        { label: 'Name', value: item.name },
        { label: 'Email', value: item.email },
        { label: 'Status', value: item.status },
        { label: 'Address', value: item.address },
        { label: 'Services', value: item.services?.join(', ') || 'N/A' },
      ];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity duration-300">
        <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full shadow-lg border border-gray-700 transform scale-95 opacity-0 animate-scaleIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {profileFields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">{field.label}</span>
                <span className="text-white text-lg font-semibold">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DocsModal = ({ vendor, onClose, onApprove, onReject }) => {
    if (!vendor) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity duration-300">
        <div className="bg-gray-800 rounded-xl p-8 max-w-lg w-full shadow-lg border border-gray-700 transform scale-95 opacity-0 animate-scaleIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Vendor Documents: {vendor.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-400">Sample Document</span>
              <div className="bg-gray-900 rounded-lg p-4 h-64 flex items-center justify-center border-dashed border-2 border-gray-700">
                <p className="text-gray-500 text-center">Placeholder for document viewer</p>
              </div>
            </div>
            {!vendor.docs_approved && (
              <div className="flex flex-col">
                <label htmlFor="rejection-remark" className="text-sm font-medium text-gray-400 mb-2">Rejection Remark</label>
                <textarea
                  id="rejection-remark"
                  rows="4"
                  value={rejectionRemark}
                  onChange={(e) => setRejectionRemark(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                ></textarea>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            {!vendor.docs_approved && (
              <>
                <button
                  onClick={onApprove}
                  className="px-6 py-3 bg-[#9FE80C] text-gray-950 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center"
                >
                  <CheckCircle size={20} className="mr-2" /> Approve
                </button>
                <button
                  onClick={onReject}
                  disabled={!rejectionRemark}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold disabled:bg-red-800 disabled:text-gray-400 hover:bg-red-700 transition-colors flex items-center"
                >
                  <FileX size={20} className="mr-2" /> Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-950 text-white p-4 flex flex-col shadow-lg`}>
      <div className="flex justify-between items-center mb-6 md:hidden">
        <span className="text-xl font-bold">Admin Panel</span>
        <button onClick={() => setIsSidebarOpen(false)} className="text-white focus:outline-none">
          <X size={24} />
        </button>
      </div>
      <div className="flex-shrink-0 mb-8">
        <h1 className="text-3xl font-extrabold text-[#9FE80C]">motobuket</h1>
        <p className="text-sm font-light text-gray-400">Admin Dashboard</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {['dashboard', 'users', 'vendors', 'analytics', 'coupons', 'subscriptions', 'docs', 'policies'].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${activeTab === tab ? 'bg-[#9FE80C] text-gray-950 shadow-lg' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                {tab === 'dashboard' && <LayoutDashboard className="mr-3" />}
                {tab === 'users' && <Users className="mr-3" />}
                {tab === 'vendors' && <Store className="mr-3" />}
                {tab === 'analytics' && <BarChart2 className="mr-3" />}
                {tab === 'coupons' && <Ticket className="mr-3" />}
                {tab === 'subscriptions' && <List className="mr-3" />}
                {tab === 'docs' && <FileText className="mr-3" />}
                {tab === 'policies' && <FileText className="mr-3" />}
                <span className="capitalize">{tab}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Auth note is removed as auth is handled by the backend */}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#9FE80C]"></div>
        </div>
      );
    }
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Users size={32} className="text-[#9FE80C] mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Total Users</h2>
                  <p className="text-gray-400 text-sm">Active & Pending</p>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-white">{users.length}</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-4">
                <Store size={32} className="text-[#9FE80C] mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Total Vendors</h2>
                  <p className="text-gray-400 text-sm">Active & Pending</p>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-white">{vendors.length}</p>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700 transition-transform transform hover:scale-105">
              <div className="flex items-center mb-4">
                <CheckCircle size={32} className="text-[#9FE80C] mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Pending Approvals</h2>
                  <p className="text-gray-400 text-sm">Users & Vendors</p>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-white">{users.filter(u => u.status === 'pending').length + vendors.filter(v => v.status === 'pending').length}</p>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="relative">
                <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] transition-colors" />
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'approved' ? 'bg-[#9FE80C] text-black' : 'bg-orange-500 text-gray-900'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleViewProfile(user, 'user')} className="text-[#9FE80C] hover:text-green-400 flex items-center">
                            <Eye size={16} className="mr-1" /> View
                          </button>
                          {user.status === 'pending' && (
                            <button onClick={() => handleApprove(user.id, 'user')} className="text-[#9FE80C] hover:text-green-400 flex items-center">
                              <CheckCircle size={16} className="mr-1" /> Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'vendors':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Vendor Management</h2>
              <div className="relative">
                <input type="text" placeholder="Search vendors..." className="pl-10 pr-4 py-2 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] transition-colors" />
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vendors.map(vendor => (
                    <tr key={vendor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{vendor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{vendor.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vendor.status === 'approved' ? 'bg-[#9FE80C] text-black' : 'bg-orange-500 text-gray-900'}`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleViewProfile(vendor, 'vendor')} className="text-[#9FE80C] hover:text-green-400 flex items-center">
                            <Eye size={16} className="mr-1" /> View
                          </button>
                          {vendor.status === 'pending' && (
                            <button onClick={() => handleApprove(vendor.id, 'vendor')} className="text-[#9FE80C] hover:text-green-400 flex items-center">
                              <CheckCircle size={16} className="mr-1" /> Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Analytics</h2>
              <button
                // onClick={handleExportToExcel}
                className="px-4 py-2 bg-[#9FE80C] text-gray-950 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center"
              >
                <FileDown size={20} className="mr-2" />
                Export to Excel
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-700">
                <div className="flex items-center mb-2">
                  <TrendingUp size={24} className="text-[#9FE80C] mr-3" />
                  <h3 className="text-lg font-semibold text-white">Orders This Week</h3>
                </div>
                <p className="text-4xl font-extrabold text-white">{weeklyOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-700">
                <div className="flex items-center mb-2">
                  <TrendingUp size={24} className="text-[#9FE80C] mr-3" />
                  <h3 className="text-lg font-semibold text-white">Orders This Month</h3>
                </div>
                <p className="text-4xl font-extrabold text-white">{monthlyOrders}</p>
              </div>
              <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-700">
                <div className="flex items-center mb-2">
                  <TrendingUp size={24} className="text-[#9FE80C] mr-3" />
                  <h3 className="text-lg font-semibold text-white">New Users (MoM)</h3>
                </div>
                <p className="text-4xl font-extrabold text-white">{userGrowthThisMonth}</p>
              </div>
              <div className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-700">
                <div className="flex items-center mb-2">
                  <TrendingUp size={24} className="text-[#9FE80C] mr-3" />
                  <h3 className="text-lg font-semibold text-white">New Vendors (MoM)</h3>
                </div>
                <p className="text-4xl font-extrabold text-white">{vendorGrowthThisMonth}</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-700">
              <div className="flex items-center mb-4">
                <Globe size={24} className="text-[#9FE80C] mr-3" />
                <h3 className="text-xl font-semibold text-white">Platform Traffic (Last 7 Days)</h3>
              </div>
              <div className="h-48 relative">
                <svg className="absolute inset-0 w-full h-full text-[#9FE80C]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline fill="none" stroke="currentColor" strokeWidth="2" points={`0,${100 - (dailyTraffic[0] / 3000) * 100} 14,${100 - (dailyTraffic[1] / 3000) * 100} 28,${100 - (dailyTraffic[2] / 3000) * 100} 42,${100 - (dailyTraffic[3] / 3000) * 100} 56,${100 - (dailyTraffic[4] / 3000) * 100} 70,${100 - (dailyTraffic[5] / 3000) * 100} 84,${100 - (dailyTraffic[6] / 3000) * 100} 98,${100 - (dailyTraffic[6] / 3000) * 100}`} />
                </svg>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-green-400">
                  <TrendingUp size={24} className="mr-2" />
                  <span className="text-lg">+12.5%</span>
                </div>
                <p className="text-gray-400">vs. last week</p>
              </div>
            </div>
          </div>
        );
      case 'policies':
        const policyContent = {
          terms: policies.terms_and_conditions || 'Loading...',
          privacy: policies.privacy_policy || 'Loading...',
          payment: policies.payment_policy || 'Loading...',
          refund: policies.refund_policy || 'Loading...',
        };

        const setPolicyContent = (key, value) => setPolicies(prev => ({ ...prev, [key]: value }));

        return (
          <div className="bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Policy Management</h2>
              {policySaved && (
                <div className="flex items-center text-green-400 font-semibold transition-all duration-300">
                  <CheckCircle size={20} className="mr-2" /> Policy Saved!
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              {['terms', 'privacy', 'payment', 'refund'].map(policy => (
                <button
                  key={policy}
                  onClick={() => { setActivePolicyTab(policy); setPolicySaved(false); }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activePolicyTab === policy ? 'bg-[#9FE80C] text-gray-950' : 'bg-gray-900 text-gray-300 hover:bg-gray-700'}`}
                >
                  {policy.charAt(0).toUpperCase() + policy.slice(1)} Policy
                </button>
              ))}
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 capitalize">{activePolicyTab.charAt(0).toUpperCase() + activePolicyTab.slice(1)} Policy</h3>
              <textarea
                className="w-full h-96 p-4 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9FE80C]"
                value={policyContent[activePolicyTab]}
                onChange={(e) => setPolicyContent(activePolicyTab, e.target.value)}
              />
              <button
                onClick={handleSavePolicy}
                className="mt-4 px-6 py-3 bg-[#9FE80C] text-gray-950 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center"
              >
                <CheckCircle size={20} className="mr-2" /> Save Policy
              </button>
            </div>
          </div>
        );
      case 'coupons':
        return (
          <div className="bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Coupon Generation</h2>
            <form onSubmit={handleGenerateCoupon} className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Generate New Coupon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g., SAVE25)"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] focus:ring focus:ring-[#9FE80C] focus:ring-opacity-50 transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Discount (e.g., 25%)"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] focus:ring focus:ring-[#9FE80C] focus:ring-opacity-50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full md:w-auto px-6 py-3 bg-[#9FE80C] text-gray-950 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center"
              >
                <PlusCircle className="mr-2" size={20} /> Generate Coupon
              </button>
            </form>
            <h3 className="text-xl font-semibold text-white mb-4">Existing Coupons</h3>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {coupons.map(coupon => (
                    <tr key={coupon.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{coupon.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{coupon.discount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{new Date(coupon.created_at).toLocaleDateString() || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'subscriptions':
        return (
          <div className="bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Subscription Plans</h2>
            <form onSubmit={handleCreatePlan} className="mb-8 p-6 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Create New Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Plan Name (e.g., Premium Plan)"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] focus:ring focus:ring-[#9FE80C] focus:ring-opacity-50 transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Price (e.g., $19.99/mo)"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] focus:ring focus:ring-[#9FE80C] focus:ring-opacity-50 transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Features (e.g., 100 listings, analytics)"
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] focus:ring focus:ring-[#9FE80C] focus:ring-opacity-50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full md:w-auto px-6 py-3 bg-[#9FE80C] text-gray-950 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center"
              >
                <PlusCircle className="mr-2" size={20} /> Create Plan
              </button>
            </form>
            <h3 className="text-xl font-semibold text-white mb-4">Existing Plans</h3>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plan Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Features</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {subscriptionPlans.map(plan => (
                    <tr key={plan.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{plan.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{plan.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{plan.features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'docs':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Vendor Documents</h2>
              <div className="relative">
                <input type="text" placeholder="Search vendors..." className="pl-10 pr-4 py-2 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-[#9FE80C] transition-colors" />
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vendor Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vendors.filter(v => !v.docs_approved).map(vendor => (
                    <tr key={vendor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{vendor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vendor.docs_approved ? 'bg-[#9FE80C] text-black' : 'bg-orange-500 text-gray-900'}`}>
                          {vendor.docs_approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDocs(vendor)}
                          className="text-[#9FE80C] hover:text-green-400 flex items-center"
                        >
                          <Eye size={16} className="mr-1" /> View Documents
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div>Select a tab from the sidebar.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex font-sans">
      <style>{`
        body { background-color: #1a202c; }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="md:hidden flex items-center justify-between mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-extrabold text-[#9FE80C]">motobuket</h1>
          <button className="flex items-center text-gray-400 hover:text-white transition-colors">
            <User size={20} className="mr-2" />
            Admin
          </button>
        </div>
        {renderContent()}
      </div>
      {isProfileModalOpen && (
        <ProfileModal item={selectedUser} onClose={closeModals} />
      )}
      {isDocsModalOpen && (
        <DocsModal
          vendor={selectedVendorDoc}
          onClose={closeModals}
          onApprove={handleApproveDocs}
          onReject={handleRejectDocs}
        />
      )}
    </div>
  );
};

export default Admindashboard;
"use client";
import React from 'react';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <svg
                key={i}
                className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-700'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
};

const Vendorprofile = () => {
    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/600x400/1e293b/94a3b8?text=Image+Unavailable';
    };

    return (
        <div className="text-white">
            <div className="relative min-h-screen">
                {/* Cover Photo and Overlay */}
                <div className="relative h-[350px] bg-[url('https://images.unsplash.com/photo-1594723055456-e97089182312?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                </div>

                <div className="container mx-auto px-4 md:px-8 -mt-32 relative z-10">
                    {/* Profile Card */}
                    <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-12 border border-slate-700">
                        <div className="flex flex-col items-center text-center -mt-32">
                            {/* Logo */}
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 flex items-center justify-center shadow-lg">
                                <svg className="w-2/3 h-2/3 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </div>

                            {/* Vendor Info */}
                            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-white">ProMotorcycle Works</h1>
                            <div className="mt-2 flex items-center space-x-2 text-green-400 font-medium">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <span>Verified Vendor</span>
                            </div>
                            <div className="mt-4 flex items-center space-x-1">
                                <span className="text-3xl font-bold text-yellow-400">4.8</span>
                                <StarRating rating={4.8} />
                            </div>
                        </div>

                        {/* Main Content Sections */}
                        <div className="mt-12 space-y-12">
                            {/* About Section */}
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
                                <p className="text-slate-400 leading-relaxed">
                                    ProMotorcycle Works is your one-stop shop for all motorcycle repairs, customizations, and maintenance. Our certified technicians have over 20 years of experience, specializing in a wide range of bikes from classic cruisers to modern sportbikes. We use only the highest quality parts and stand behind our work with a full satisfaction guarantee.
                                </p>
                            </div>

                            {/* Services Section */}
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-white">Our Services</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Service Card 1 */}
                                    <div className="bg-slate-800 rounded-xl p-6 transition-all hover:bg-slate-700 hover:shadow-lg border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-2 text-white">General Maintenance</h3>
                                        <p className="text-slate-400 text-sm">Oil changes, chain adjustments, tire checks, and full tune-ups to keep your bike running smoothly.</p>
                                    </div>
                                    {/* Service Card 2 */}
                                    <div className="bg-slate-800 rounded-xl p-6 transition-all hover:bg-slate-700 hover:shadow-lg border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-2 text-white">Engine Repair & Tuning</h3>
                                        <p className="text-slate-400 text-sm">From minor repairs to complete overhauls, we can handle any engine issue. We also offer performance tuning.</p>
                                    </div>
                                    {/* Service Card 3 */}
                                    <div className="bg-slate-800 rounded-xl p-6 transition-all hover:bg-slate-700 hover:shadow-lg border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-2 text-white">Custom Modifications</h3>
                                        <p className="text-slate-400 text-sm">Want a unique look? We offer custom paint, exhaust systems, lighting, and frame modifications.</p>
                                    </div>
                                    {/* Service Card 4 */}
                                    <div className="bg-slate-800 rounded-xl p-6 transition-all hover:bg-slate-700 hover:shadow-lg border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-2 text-white">Tire Services</h3>
                                        <p className="text-slate-400 text-sm">Expert tire mounting, balancing, and repair for all motorcycle types.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Section */}
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-white">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {/* Gallery Image 1 */}
                                    <img src="https://images.unsplash.com/photo-1594916295552-b88339b16892?q=80&w=2070&auto=format&fit=crop" alt="Custom bike" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105" onError={handleImageError} />
                                    {/* Gallery Image 2 */}
                                    <img src="https://images.unsplash.com/photo-1594732155708-ecb1836104e7?q=80&w=2070&auto=format&fit=crop" alt="Shop interior" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105" onError={handleImageError} />
                                    {/* Gallery Image 3 */}
                                    <img src="https://images.unsplash.com/photo-1594723055456-e97089182312?q=80&w=2070&auto=format&fit=crop" alt="Engine rebuild" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105" onError={handleImageError} />
                                    {/* Gallery Image 4 */}
                                    <img src="https://images.unsplash.com/photo-1594732168937-9759c9d54508?q=80&w=2070&auto=format&fit=crop" alt="Maintenance" className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105" onError={handleImageError} />
                                </div>
                            </div>

                            {/* Ratings Section */}
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-white">Customer Ratings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Overall Rating */}
                                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-5xl font-extrabold text-yellow-400">4.8</span>
                                            <div className="flex items-center">
                                                <StarRating rating={4.8} />
                                            </div>
                                        </div>
                                        <p className="text-slate-400">Based on 125 reviews</p>
                                    </div>

                                    {/* Star Distribution */}
                                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                        <h3 className="text-xl font-semibold mb-4 text-white">Star Distribution</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">5 Star</span>
                                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">4 Star</span>
                                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '8%' }}></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">3 Star</span>
                                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '2%' }}></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">2 Star</span>
                                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">1 Star</span>
                                                <div className="flex-1 bg-slate-700 rounded-full h-2">
                                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Reviews Section */}
                            <div>
                                <h2 className="text-3xl font-bold mb-4 text-white">Customer Reviews</h2>
                                <div className="space-y-8">
                                    {/* Review 1 */}
                                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-semibold text-white">Alex Johnson</h4>
                                            <StarRating rating={4} />
                                        </div>
                                        <p className="text-slate-400 mb-4">"Absolutely fantastic service! The team was knowledgeable, friendly, and got my bike running better than ever. The custom exhaust they installed looks and sounds incredible. Highly recommend them for any repair or customization work."</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            <img src="https://placehold.co/200x200/5d4037/ffffff?text=Exhaust+Pipe" alt="Custom Exhaust" className="w-full h-auto rounded-lg object-cover" />
                                            <img src="https://placehold.co/200x200/5d4037/ffffff?text=New+Tires" alt="New Tires" className="w-full h-auto rounded-lg object-cover" />
                                            <img src="https://placehold.co/200x200/5d4037/ffffff?text=Custom+Paint" alt="Custom Paint Job" className="w-full h-auto rounded-lg object-cover" />
                                        </div>
                                    </div>

                                    {/* Review 2 */}
                                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-semibold text-white">Sarah Williams</h4>
                                            <StarRating rating={5} />
                                        </div>
                                        <p className="text-slate-400 mb-4">"Came in for a basic oil change and chain cleaning. They were quick, professional, and gave me a fair price. My bike feels much smoother now. I'll definitely be back for my next service."</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            <img src="https://placehold.co/200x200/222222/ffffff?text=Oil+Change" alt="Oil change" className="w-full h-auto rounded-lg object-cover" />
                                            <img src="https://placehold.co/200x200/222222/ffffff?text=Clean+Chain" alt="Clean chain" className="w-full h-auto rounded-lg object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendorprofile;
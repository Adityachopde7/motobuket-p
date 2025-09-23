"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";


const AddTestimonial = () => {
  const [form, setForm] = useState({ name: "", title: "", description: "", stars: 5 });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("stars", form.stars);
    if (image) data.append("image", image);

    await axios.post("http://localhost:5000/testimonials", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    alert("Uploaded!");
  };

  return (
  <>
  
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 mt-20 p-4">
    <h3 className="font-bold text-white text-3xl mb-6">Testimonials</h3>
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md p-6 space-y-4 bg-gray-900 rounded-lg shadow-lg"
    >
      <input 
        type="text" 
        placeholder="Name" 
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input 
        type="text" 
        placeholder="Title" 
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea 
        placeholder="Description" 
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" 
        rows={4} 
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input 
        type="number" 
        placeholder="Stars" 
        defaultValue={5} 
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        onChange={e => setForm({ ...form, stars: Number(e.target.value) })}
      />

      <input 
        type="file" 
        className="w-full text-white" 
        onChange={e => setImage(e.target.files[0])} 
      />

      <button 
        type="submit" 
        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition-colors"
      >
        Upload
      </button>
    </form>
  
  </div>
   
  </>
);

};

export default function App() {
  return (
    <main>
    <Navbar />
      
        <AddTestimonial />
              <Footer />
    
          
          </main>
  );
}

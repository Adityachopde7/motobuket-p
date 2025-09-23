"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- Chatbot Component ---
const Chatbot = () => {
    // State to store the chat messages
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! Welcome to MotoBukket. How can I help you with your car wash needs today?" }
    ]);
    // State to store the user's current input
    const [input, setInput] = useState('');
    // State to show a loading indicator when the bot is thinking
    const [isLoading, setIsLoading] = useState(false);
    // Ref to scroll the message container to the bottom
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the message list whenever messages are updated
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add the user's message to the chat history
        const userMessage = { role: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

        // Call the Gemini API to get a response
        try {
            const prompt = `You are a helpful assistant for a car wash called MotoBukket. You can answer questions about car wash services, pricing, and booking appointments. Keep your responses friendly and concise.
            
            User message: ${input}`;

            const chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "" // Leave as-is for canvas environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            // Exponential backoff for API calls
            let response;
            let retries = 0;
            const maxRetries = 5;
            while (retries < maxRetries) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.status === 429) { // Too many requests
                        const delay = Math.pow(2, retries) * 1000;
                        console.log(`Rate limit hit. Retrying in ${delay}ms...`);
                        await new Promise(res => setTimeout(res, delay));
                        retries++;
                        continue;
                    }

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    break; // Success, exit the loop
                } catch (error) {
                    if (retries === maxRetries - 1) {
                        throw error;
                    }
                    retries++;
                }
            }

            const result = await response.json();
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

            setMessages(prevMessages => [...prevMessages, { role: 'bot', text: botResponse }]);

        } catch (error) {
            console.error("Failed to fetch from API:", error);
            setMessages(prevMessages => [...prevMessages, { role: 'bot', text: "I'm sorry, an error occurred. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-900 rounded-2xl shadow-xl overflow-hidden font-sans">
            {/* Chat header */}
            <div className="bg-[#67D300] p-4 text-black text-center font-bold text-xl rounded-t-2xl">
                MotoBukket Chat
            </div>
            
            {/* Message display area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`rounded-xl p-3 max-w-[80%] break-words ${
                                msg.role === 'user' 
                                ? 'bg-gray-700 text-white' 
                                : 'bg-[#67D300] text-gray-900'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="rounded-xl p-3 bg-[#67D300] text-gray-900 animate-pulse">
                            <div className="h-2 w-16 bg-gray-900 rounded"></div>
                        </div>
                    </div>
                )}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t-2 border-gray-700 flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services..."
                    className="flex-1 p-3 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-[#67D300] transition-colors placeholder-gray-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="ml-3 p-3 bg-[#67D300] text-black rounded-xl font-bold transition-all hover:bg-[#51A500] focus:outline-none"
                    disabled={isLoading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};
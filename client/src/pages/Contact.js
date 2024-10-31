import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Thank you for reaching out!');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center" style={{ fontFamily: `'Playfair Display', serif` }}>
            {/* Header */}
            <header className="bg-gray-800 text-white py-6 shadow-lg w-full">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <p className="text-lg text-gray-800 text-center mb-8">
                    Feel free to reach out for any questions or feedback!
                </p>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-200 font-medium"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="text-center mt-8">
                    <Link to="/view-all-articles" className="text-indigo-600 hover:text-indigo-400 font-medium text-lg">
                        Back to Home
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-6 mt-12 w-full">
                <div className="container mx-auto px-4 text-center text-sm italic">
                    &copy; {new Date().getFullYear()} The Article Hub Gazette. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Contact;

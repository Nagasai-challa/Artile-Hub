import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 text-center">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600 text-center">Manage your articles and content from here.</p>

                <div className="mt-8 flex flex-col space-y-4">
                    <Link to="/create-article">
                        <button className="w-full px-4 py-2 text-lg font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            Create New Article
                        </button>
                    </Link>
                    
                    <Link to="/view-articles">
                        <button className="w-full px-4 py-2 text-lg font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            View Articles
                        </button>
                    </Link>

                    <Link to="/">
                        <button className="w-full px-4 py-2 text-lg font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

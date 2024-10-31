import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-700">Welcome</h1>
                <p className="mt-2 text-center text-gray-500">Select an option to continue</p>
                
                <div className="mt-6 flex flex-col space-y-4">
                    <Link to="/user-login">
                        <button className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
                            Login as User
                        </button>
                    </Link>
                    <Link to="/admin-login">
                        <button className="w-full py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition">
                            Login as Admin
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;

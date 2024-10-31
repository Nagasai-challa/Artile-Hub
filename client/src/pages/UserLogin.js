import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage]=useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/user-login",{
                email,password
            })
            const token=response.data.token;
            localStorage.setItem("user-token",token);
            setMessage("Login SuccessFull");
            window.location.assign("/view-all-articles")
        }catch(error){
            setMessage("Login Failed")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">User Login</h2>
                <form onSubmit={handleLogin}  className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter username"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                            type="submit"
                            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Log In
                        </button>
                    <Link to={"/user-register"}>
                        <button
                            type=""
                            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </Link>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default UserLogin;

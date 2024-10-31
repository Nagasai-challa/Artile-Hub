import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EditArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const adminToken = localStorage.getItem("admin-token");

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`http://localhost:5000/get-single-post/?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });
                const data = response.data.post;
                setTitle(data.title);
                setContent(data.content);
                setAuthorEmail(data.email);
            } catch (error) {
                alert("Failed To Get Post");
            }
        }
        fetchPost();
    }, [id, adminToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/edit-post", {
                title, content, email: authorEmail, id
            }, { headers: { 'Authorization': `Bearer ${adminToken}` } });
            setMessage("Article Edited successfully!");
        } catch (error) {
            setMessage("Failed to Edit Article");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Edit Article</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="articleTitle" className="block text-sm font-medium text-gray-600">
                            Title
                        </label>
                        <input
                            type="text"
                            id="articleTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter article title"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="articleContent" className="block text-sm font-medium text-gray-600">
                            Content
                        </label>
                        <textarea
                            id="articleContent"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter article content"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-600">
                            Author Email
                        </label>
                        <input
                            type="email"
                            id="authorEmail"
                            value={authorEmail}
                            onChange={(e) => setAuthorEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                        Edit Article
                    </button>
                </form>
                {message && <p className="mt-2 text-center text-green-600">{message}</p>}
                
                {/* Back to Admin Dashboard Button */}
                <Link to="/admin-dashboard">
                    <button className="w-full py-2 mt-4 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                        Back to Admin Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default EditArticle;

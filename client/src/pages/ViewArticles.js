import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ViewArticles() {
    const [articles, setArticles] = useState([]);
    const email = localStorage.getItem("admin-mail");
    const navigate = useNavigate();
    const adminToken = localStorage.getItem("admin-token");

    useEffect(() => {
        async function getArticles() {
            try {
                const response = await axios.get(`http://localhost:5000/get-admin-posts?email=${email}`, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });
                console.log(response.data.posts);
                setArticles(response.data.posts);
            } catch (error) {
                alert("Failed To Get Articles");
            }
        }
        getArticles();
    }, []);

    async function deletePost(id) {
        try {
            await axios.post(`http://localhost:5000/delete-post/?id=${id}`);
            alert("Article Deleted Successfully");
            window.location.reload();
        } catch (error) {
            alert("Failed To Delete Article");
        }
    }

    if (!articles.length) {
        return <h1>Loading.. :)</h1>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={() => navigate("/admin-dashboard")}
                    className="px-4 py-2 mb-4 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                    Back to Home
                </button>
                <h1 className="text-3xl font-semibold text-gray-800">Articles</h1>
                <div className="mt-8 space-y-4">
                    {articles.map((article, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                            <p className="mt-2 text-gray-600">{article.content}</p>
                            <div className="mt-4">
                                <Link to={`/edit-post/${article._id}`}>
                                    <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => deletePost(article._id)} 
                                    className="ml-2 px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewArticles;

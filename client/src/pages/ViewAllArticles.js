import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAllArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedArticle, setExpandedArticle] = useState(null);
    const userToken = localStorage.getItem('user-token');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-all-posts', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                setArticles(response.data.posts);
            } catch (err) {
                setError('Failed to fetch articles. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const toggleArticle = (id) => {
        setExpandedArticle(expandedArticle === id ? null : id);
    };

    if (loading) {
        return <h1 className="text-center text-2xl text-gray-700">Loading...</h1>;
    }

    if (error) {
        return <h1 className="text-red-500 text-center text-xl">{error}</h1>;
    }

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center font-roboto">
            {/* Header */}
            <header className="bg-gray-800 text-white py-4 shadow-lg w-full">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-wide">Article Hub</h1>
                    <nav className="space-x-6">
                        <Link to="/about" className="hover:text-gray-300">About</Link>
                        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="space-y-12">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className="bg-white p-8 rounded-md shadow-sm border border-gray-300"
                        >
                            <h3 className="text-2xl font-bold text-gray-900">{article.title.toUpperCase()}</h3>
                            <div className="mt-4 text-gray-700 leading-relaxed space-y-4">
                                {(expandedArticle === article._id ? article.content : `${article.content.substring(0, 200)}...`)
                                    .split('\n')
                                    .map((paragraph, index) => (
                                        <p key={index} className="text-justify">
                                            {paragraph}
                                        </p>
                                    ))}
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => toggleArticle(article._id)}
                                    className="text-gray-700 font-medium hover:underline"
                                >
                                    {expandedArticle === article._id ? 'Show Less' : 'Read More'}
                                </button>
                            </div>
                        </div>
                    ))}
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

export default ViewAllArticles;

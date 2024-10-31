import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                if (response.status === 200) {
                    setPosts(response.data.posts);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!posts.length) return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;

    const ContentCard = ({ data }) => {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
                <p className="text-gray-700 mb-4">{data.content}</p>
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>{data.author}</span>
                    <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
            <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
            <div className="w-full max-w-2xl">
                {posts.map((p) => (
                    <ContentCard key={p._id} data={p} />
                ))}
            </div>
        </div>
    );
}

export default PostDetail;

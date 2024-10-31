import React, { useState } from 'react';
import axios from 'axios';


function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    const token=localStorage.getItem("token")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/posts",{
                title,content,tags,author
            },{headers: {
                'Authorization': `Bearer ${token}`
            }})
            setMessage("Post Created SuccessFull"); 
        } catch (error) {
            console.error("Error response:", error.response || error);
            alert('Failed to create post.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Create New Post</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40"
                    ></textarea>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default CreatePost;

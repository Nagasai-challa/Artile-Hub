import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ViewSingleArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {id}=useParams
    const userToken=localStorage.getItem("user-token")

    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const response=await axios.get(`http://localhost:5000/get-single-post/?id=${id}`,{
                    headers:{
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                const data=response.data.post;
                setTitle(data.title);
                setContent(data.content);
            }catch(error){
                alert("Failed To Get Post")
            }
        };

        fetchArticles();
    }, []);

    

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold text-gray-800">Articles</h1>
                <div className="mt-8 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="mt-2 text-gray-600">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default ViewSingleArticle;

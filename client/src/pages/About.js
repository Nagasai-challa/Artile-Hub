import React from 'react';

function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans px-6 py-12">
            <div className="bg-white max-w-3xl p-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Article Hub</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Welcome to Article Hub, your go-to source for insightful articles across a wide range of topics. Our mission is to provide readers with high-quality, engaging content that informs, inspires, and entertains.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We believe that knowledge should be accessible to everyone, and our team of dedicated writers and editors work tirelessly to curate articles that are both informative and enjoyable. Whether you're interested in technology, lifestyle, health, or culture, we have something for everyone.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Thank you for visiting Article Hub. We hope you find our content enriching and look forward to building a community of curious minds who share our passion for learning.
                </p>
                <div className="mt-8 text-center">
                    <button
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                        onClick={() => window.history.back()}
                    >
                        Back to Articles
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;

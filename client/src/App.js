import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import UserRegister from './pages/UserRegister';
import AdminDashboard from './pages/AdminDashboard';
import CreateArticle from './pages/CreateArticle';
import ViewArticles from './pages/ViewArticles';
import EditArticle from './pages/EditArticle';
import ViewAllArticles from './pages/ViewAllArticles';
import ViewSingleArticle from './pages/ViewSingleArticle'
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
    return (
        <>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/user-login" element={<UserLogin />} />
                        <Route path="/user-register" element={<UserRegister />} />
                        <Route path="/admin-register" element={<AdminRegister />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/view-articles" element={<ViewArticles />} />
                        <Route path="/view-all-articles" element={<ViewAllArticles />} />
                        <Route path="/edit-post/:id" element={<EditArticle />} />
                        <Route path="/create-article" element={<CreateArticle />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/post" element={<PostDetail />} />
                    </Routes>
                </Router>
        </>
    );
}

export default App;

import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import AutoParts from "../pages/AutoPartsListing";
import AutoPartsDetails from "../pages/AutoPartsDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";
const Routers = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('User')) || null);
  const handleLogin = (User) => {
    setUser(User);
  };
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/autoparts" element={<AutoParts />} />
      <Route path="/autoparts/:slug" element={<AutoPartsDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;

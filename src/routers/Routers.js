import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import AutoParts from "../pages/AutoPartsListing";
import AutoPartsDetails from "../pages/AutoPartsDetails";
import Video from "../pages/Video";
import VideoDetails from "../pages/VideoDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmailVerification from "../pages/EmailVerification";
import EmailVerificationLogin from "../pages/EmailVerificationLogin";
import BecomeSeller from "../components/UI/BecomeSeller";
import UserProfile from "../pages/UserProfile";
import AdminLogin from "../pages/adminLogin";
import AdminRegister from "../pages/adminRegister";
import UpdateUser from "../pages/updateUser";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/autoparts" element={<AutoParts />} />
      <Route path="/autoparts/:slug" element={<AutoPartsDetails />} />
      <Route path="/videos" element={<Video />} />
      <Route path="/videos/:slug" element={<VideoDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/emailVerification" element={<EmailVerification />} />
      <Route path="/EmailVerificationLogin" element={<EmailVerificationLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/becomeseller" element={<BecomeSeller />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/updateUser" element={<UpdateUser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;

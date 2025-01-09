import React from "react";
// Ensure the correct path to Routes or create the file if it doesn't exist

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
      <Route path='/captain-login' element={<Captainlogin/>}/>
      <Route path="/captain-signup" element={<CaptainSignup/>}/>
      </Routes>
    </div>
  )
}

export default App
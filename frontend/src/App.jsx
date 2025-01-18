import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import UserLogout from "./pages/UserLogout";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainLogout from "./pages/CaptainLogut";
import CaptainContext from './context/CaptainContext';  // Import the CaptainContext
import Riding from './pages/Riding'
import CaptainRiding from "./pages/CaptainRiding";

const App = () => {
  return (
    <CaptainContext>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/riding' element={<Riding/>}/>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path='/userlogout' element={<UserLogout />} />
        <Route path="/captain-home" element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain-logout' element={<CaptainLogout />} />
      <Route path="/captain-Riding" element={<CaptainRiding/>}/>
      </Routes>
    </CaptainContext>
  );
};

export default App;

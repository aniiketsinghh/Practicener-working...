import {Route, Routes} from 'react-router';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import React from 'react';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // JWT cookie check
    const isLoggedIn = document.cookie.includes("jwt=");
    setIsAuthenticated(isLoggedIn);
  }, []);
  return (
    <div className="text-3xl font-bold underline">
      <Navbar />
    
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage />: <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <HomePage />: <SignUpPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage/>: <HomePage />} />
      </Routes>
    </div>
  )
}

export default App

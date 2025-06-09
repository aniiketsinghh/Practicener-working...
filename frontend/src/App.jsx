import {Route, Routes} from 'react-router';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import React from 'react';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CreateNote from './pages/CreatePage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // JWT cookie check
    const isLoggedIn = document.cookie.includes("jwt=");
    setIsAuthenticated(isLoggedIn);
  }, []);
  return (
    <div className="text-3xl font-bold underline">

              {isAuthenticated  ?<Navbar />: <LoginPage />}
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>
    </div>
  )
}

export default App

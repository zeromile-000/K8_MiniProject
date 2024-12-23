import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <div className="font-sans">
        <header className="py-6 text-white bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container flex items-center justify-between mx-auto">
            <h1 className="text-3xl font-bold">Trip Organizer</h1>
            <nav>
              <Link to="/" className="mx-4 text-lg">Home</Link>
              <Link to="/login" className="mx-4 text-lg">Login</Link>
              <Link to="/signup" className="mx-4 text-lg">Sign Up</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen py-8 bg-gray-50">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} /> {/* 메인 페이지 설정 */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </main>
        <footer className="py-4 text-white bg-gray-800">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Trip Organizer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

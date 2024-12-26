import React from "react";
import { BrowserRouter , Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DistrictDisplay from "./components/DistrictDisplay"; // DistrictDisplay 컴포넌트 임포트
import TourInfo from "./components/TourInfo";

const App = () => {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <header className="py-6 text-white bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container flex items-center justify-between mx-auto">
            {/* 버튼으로 수정된 부분 */}
            <HomeButton />
            <nav>
              <Link to="/" className="mx-4 text-lg">Home</Link>
              <Link to="/login" className="mx-4 text-lg">Login</Link>
              <Link to="/signup" className="mx-4 text-lg">Sign Up</Link>
              <Link to="/districts" className="mx-4 text-lg">Districts</Link> 
              <Link to="/tourInfo" className="mx-4 text-lg">TourInfo</Link> 
            </nav>
          </div>
        </header>
        <main className="min-h-screen py-8 bg-gray-50">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/districts" element={<DistrictDisplay />} /> 
              <Route path="/tourInfo" element={<TourInfo />} /> 
            </Routes>
          </div>
        </main>
        <footer className="py-4 text-white bg-gray-800">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Trip Organizer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

// HomeButton 컴포넌트 추가
const HomeButton = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <button
      onClick={() => navigate("/")} // 버튼 클릭 시 Home으로 이동
      className="px-4 py-2 text-xl font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      Trip Organizer
    </button>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DistrictDisplay from "./components/DistrictDisplay"; // DistrictDisplay 컴포넌트 임포트
import TourInfo from "./components/TourInfo";
import KakaoMap from "./components/KakaoMap";
import TravelDetail from "./components/TravelDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div className="font-sans">
        {/* 헤더 */}
        <header className="py-6 text-white bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <HomeButton />
            <nav className="flex flex-wrap items-center justify-center mt-4 md:mt-0">
              <Link to="/" className="mx-2 text-sm md:text-lg hover:underline">
                Home
              </Link>
              <Link to="/login" className="mx-2 text-sm md:text-lg hover:underline">
                Login
              </Link>
              <Link to="/signup" className="mx-2 text-sm md:text-lg hover:underline">
                Sign Up
              </Link>
              <Link to="/districts" className="mx-2 text-sm md:text-lg hover:underline">
                Districts
              </Link>
              <Link to="/tourInfo" className="mx-2 text-sm md:text-lg hover:underline">
                TourInfo
              </Link>
              <Link to="/kakaoMap" className="mx-2 text-sm md:text-lg hover:underline">
                KakaoMap
              </Link>
            </nav>
          </div>
        </header>

        {/* 메인 */}
        <main className="min-h-screen py-8 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/districts" element={<DistrictDisplay />} />
              <Route path="/tourInfo" element={<TourInfo />} />
              {/* <Route path="/traveldetail" element={<TravelDetail />} /> */}
              <Route path="/traveldetail/:contentid" element={<TravelDetail />} />
              <Route path="/kakaoMap" element={<KakaoMap />} />
            </Routes>
          </div>
        </main>

        {/* 푸터 */}
        <footer className="py-4 text-white bg-gray-800">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Trip Organizer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

// HomeButton 컴포넌트
const HomeButton = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <button
      onClick={() => navigate("/")} // 버튼 클릭 시 Home으로 이동
      className="px-4 py-2 text-base font-bold text-white bg-blue-600 rounded md:text-xl hover:bg-blue-700">
      Trip Organizer
    </button>
  );
};

export default App;

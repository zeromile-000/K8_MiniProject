import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router의 useNavigate 훅

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버로 로그인 요청
      const response = await axios.post("http://localhost:8080/login", credentials);

      console.log("Login successful", response); // 응답 확인

      // 응답 헤더에서 토큰 추출
      const token = response.headers.authorization; // "Bearer <token>"에서 토큰 추출

      if (token) {
        localStorage.setItem("accessToken", token); // 로컬스토리지에 저장
        console.log("Token stored:", token);
        setError("");
        navigate("/"); // 로그인 성공 시 홈으로 이동
      } else {
        console.error("Token is missing in the response headers");
        setError("로그인에 실패했습니다. 서버에서 토큰을 받지 못했습니다.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };

  const handleOAuth2LoginSuccess = async (provider) => {
    try {
      // OAuth2 성공 후 메인 페이지로 이동
      console.log(`${provider} Login successful`);
      navigate("/"); // 메인 페이지로 이동
    } catch (err) {
      console.error(`${provider} Login failed`, err);
      setError(`${provider} 로그인에 실패했습니다. 다시 시도하세요.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">로그인</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-4 text-sm text-gray-500">또는 소셜 계정으로 로그인</p>
          <div className="space-y-2">
            <button
              onClick={() => handleOAuth2LoginSuccess("google")}
              className="flex items-center justify-center w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              구글 로그인
            </button>
            <button
              onClick={() => handleOAuth2LoginSuccess("naver")}
              className="flex items-center justify-center w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              네이버 로그인
            </button>
            <button
              onClick={() => handleOAuth2LoginSuccess("kakao")}
              className="flex items-center justify-center w-full py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              카카오 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

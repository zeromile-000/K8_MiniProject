import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", credentials);
      console.log("Login successful", response.data);
      setError("");
      // 로그인 성공 후 처리 로직 추가
    } catch (err) {
      console.error("Login failed", err);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
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
            <a
              href="http://localhost:8080/oauth2/authorization/google"
              className="block w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              구글 로그인
            </a>
            <a
              href="http://localhost:8080/oauth2/authorization/naver"
              className="block w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              네이버 로그인
            </a>
            <a
              href="http://localhost:8080/oauth2/authorization/kakao"
              className="block w-full py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              카카오 로그인
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

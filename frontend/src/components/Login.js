// components/Login.js
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
      const response = await axios.post("http://localhost:8080/api/login", credentials);
      console.log("Login successful", response.data);
      setError("");
      // 로그인 성공 후 처리 로직 추가
    } catch (err) {
      console.error("Login failed", err);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">로그인</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디를 입력하세요"
          value={credentials.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
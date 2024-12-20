// components/Signup.js
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
    birthdate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/signup", formData);
      console.log("Signup successful", response.data);
      setError("");
      // 회원가입 성공 후 처리 로직 추가
    } catch (err) {
      console.error("Signup failed", err);
      setError("회원가입에 실패했습니다. 입력값을 확인하세요.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">회원가입</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;

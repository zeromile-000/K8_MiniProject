import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
    phonenumber: "", // 수정됨
    birthdate: new Date() // 수정됨
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const phoneRegex = /^\d{10,11}$/; // 10~11자리 숫자
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식

    if (!phoneRegex.test(formData.phonenumber)) { // 수정됨
      setError("휴대폰 번호는 10~11자리의 숫자여야 합니다.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력하세요.");
      return;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자리여야 합니다.");
      return;
    }

    if (!formData.username.trim()) {
      setError("아이디를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      console.log("Signup successful", response.data);
      setError("");
      navigate("/")
    } catch (err) {
      console.error("Signup failed", err);
      setError("회원가입에 실패했습니다. 입력값을 확인하세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[120%] max-w-md p-8 mx-auto bg-white rounded shadow-lg"> {/* 크기 20% 증가 */}
        <h2 className="mb-6 text-3xl font-bold text-center">회원가입</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="date"
            name="birthdate" // 수정됨
            placeholder="생년월일"
            value={formData.birthdate} // 수정됨
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="text"
            name="phonenumber" // 수정됨
            placeholder="휴대폰 번호 (10~11자리 숫자)"
            value={formData.phonenumber} // 수정됨
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-green-500 rounded hover:bg-green-600"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

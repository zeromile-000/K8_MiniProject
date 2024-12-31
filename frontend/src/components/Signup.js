import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nickname: "",
    phonenumber: "",
    birthdate: new Date(),
  });
  const [error, setError] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); // 아이디 중복 여부
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      setIsUsernameAvailable(null); // 아이디가 변경되면 중복 검사 상태 초기화
    }
  };

  const handleCheckUsername = async () => {
    if (!formData.username.trim()) {
      setError("아이디를 입력하세요.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/signup/check-username?username=${formData.username}`
      );
      setIsUsernameAvailable(!response.data); // 중복이면 false, 아니면 true
    } catch (err) {
      console.error("Username check failed", err);
      setError("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(formData.phonenumber)) {
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

    if (isUsernameAvailable === false) {
      setError("이미 사용 중인 아이디입니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      console.log("Signup successful", response.data);
      setError("");
      navigate("/");
    } catch (err) {
      console.error("Signup failed", err);
      setError("회원가입에 실패했습니다. 입력값을 확인하세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[120%] max-w-md p-8 mx-auto bg-white rounded shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center">회원가입</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <button
              type="button"
              onClick={handleCheckUsername}
              className="absolute px-3 py-1 text-sm text-white transform -translate-y-1/2 bg-blue-500 rounded right-2 top-1/2 hover:bg-blue-600"
            >
              중복 확인
            </button>
          </div>
          {isUsernameAvailable !== null && (
            <p
              className={`text-sm ${
                isUsernameAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUsernameAvailable
                ? "사용 가능한 아이디입니다."
                : "이미 사용 중인 아이디입니다."}
            </p>
          )}
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
            name="birthdate"
            placeholder="생년월일"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            type="text"
            name="phonenumber"
            placeholder="휴대폰 번호 (10~11자리 숫자)"
            value={formData.phonenumber}
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

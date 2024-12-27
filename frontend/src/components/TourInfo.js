import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TourInfo = () => {
  const [tourInfos, setTourInfos] = useState([]); // 데이터 상태

  // 데이터 로드 함수 (직접 URL 사용)
  const loadTourInfos = useCallback(async (keyword = "") => {
    try {
      const url = keyword
        ? `http://localhost:8080/tourinfo/search?keyword=${keyword}`
        : `http://localhost:8080/tourinfo?limit=12`; 
      const response = await axios.get(url);
      setTourInfos(response.data);
    } catch (error) {
      console.error("Error fetching tour info:", error);
    }
  }, []);

  // 첫 로드 시 데이터 가져오기
  useEffect(() => {
    loadTourInfos();
  }, [loadTourInfos]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Tour Information</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tourInfos.map((info, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded shadow hover:shadow-md"
          >
            <img
              src={info.firstimage || "https://via.placeholder.com/300"}
              alt={info.title || "No Image"}
              className="object-cover w-full h-48 rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
            <h2 className="mt-4 text-lg font-bold">{info.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{info.addr1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourInfo;

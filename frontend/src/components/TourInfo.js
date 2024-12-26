import React, { useState, useEffect } from "react";
import axios from "axios";

const TourInfo = () => {
  const [tourInfos, setTourInfos] = useState([]); // 전체 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드

  // 전체 데이터 로드
  const loadTourInfos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tourinfo");
      setTourInfos(response.data);
    } catch (error) {
      console.error("Error fetching tour info:", error);
    }
  };

  // 키워드 검색 실행
  const searchTourInfos = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:8080/tourinfo/search?keyword=${keyword}`);
      setTourInfos(response.data);
    } catch (error) {
      console.error("Error searching tour info:", error);
    }
  };

  // 검색 필드 변화 처리
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === "") {
      // 검색어가 없으면 전체 데이터 가져오기
      loadTourInfos();
    } else {
      // 서버에서 검색 실행
      searchTourInfos(keyword);
    }
  };

  // 첫 로드 시 전체 데이터 가져오기
  useEffect(() => {
    loadTourInfos();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl p-6 mx-auto bg-white rounded shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Tour Information</h1>

        {/* 검색 필드 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title, address, or area code"
            value={searchKeyword}
            onChange={handleSearch}
            className="w-full p-2 border rounded"
          />
        </div>

        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Address 1</th>
              <th className="p-2 border border-gray-300">Address 2</th>
              <th className="p-2 border border-gray-300">Area Code</th>
              <th className="p-2 border border-gray-300">Sigungu Code</th>
              <th className="p-2 border border-gray-300">Content ID</th>
              <th className="p-2 border border-gray-300">Content Type ID</th>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">MapX</th>
              <th className="p-2 border border-gray-300">MapY</th>
            </tr>
          </thead>
          <tbody>
            {tourInfos.map((info) => (
              <tr key={info.no} className="hover:bg-gray-100">
                <td className="p-2 text-center border border-gray-300">{info.no}</td>
                <td className="p-2 text-center border border-gray-300">{info.title}</td>
                <td className="p-2 text-center border border-gray-300">{info.addr1}</td>
                <td className="p-2 text-center border border-gray-300">{info.addr2}</td>
                <td className="p-2 text-center border border-gray-300">{info.areacode}</td>
                <td className="p-2 text-center border border-gray-300">{info.sigungucode}</td>
                <td className="p-2 text-center border border-gray-300">{info.contentid}</td>
                <td className="p-2 text-center border border-gray-300">{info.contenttypeid}</td>
                <td className="p-2 text-center border border-gray-300">
                  <img
                    src={info.firstimage || "https://via.placeholder.com/150"}
                    alt={info.title || "No Image"}
                    className="object-cover w-20 h-20"
                    onError={(e) => {
                      e.target.onerror = null; // 무한 반복 방지
                      e.target.src = "https://via.placeholder.com/150"; // 기본 이미지 설정
                    }}
                  />
                </td>
                <td className="p-2 text-center border border-gray-300">{info.mapx}</td>
                <td className="p-2 text-center border border-gray-300">{info.mapy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourInfo;

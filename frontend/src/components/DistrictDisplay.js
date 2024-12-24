import React, { useState, useEffect } from "react";
import axios from "axios";

const DistrictDisplay = () => {
  const [districts, setDistricts] = useState([]); // 모든 데이터
  const [formData, setFormData] = useState({ addr1: "", addr2: "", areacode: "", sigungucode: "" });
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [message, setMessage] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드

  // **전체 데이터 로드**
  const loadDistricts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/district");
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
      setMessage("Error fetching districts.");
    }
  };

  // **검색 실행**
  const searchDistricts = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:8080/district/search?keyword=${keyword}`);
      setDistricts(response.data); // 검색된 데이터로 상태 업데이트
    } catch (error) {
      console.error("Error searching districts:", error);
      setMessage("Error searching districts.");
    }
  };

  const createDistrict = async () => {
    try {
      await axios.post("http://localhost:8080/district", formData);
      setMessage("District created successfully.");
      setFormData({ addr1: "", addr2: "", areacode: "", sigungucode: "" });
      loadDistricts();
    } catch (error) {
      console.error("Error creating district:", error);
      setMessage("Error creating district.");
    }
  };

  const updateDistrict = async () => {
    if (!selectedDistrict) {
      setMessage("Please select a district to update.");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/district/${selectedDistrict.no}`, formData);
      setMessage("District updated successfully.");
      setSelectedDistrict(null);
      setFormData({ addr1: "", addr2: "", areacode: "", sigungucode: "" });
      loadDistricts();
    } catch (error) {
      console.error("Error updating district:", error);
      setMessage("Error updating district.");
    }
  };

  const deleteDistrict = async (no) => {
    try {
      await axios.delete(`http://localhost:8080/district/${no}`);
      setMessage(`District with no ${no} deleted successfully.`);
      loadDistricts();
    } catch (error) {
      console.error("Error deleting district:", error);
      setMessage("Error deleting district.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (district) => {
    setSelectedDistrict(district);
    setFormData({
      addr1: district.addr1,
      addr2: district.addr2,
      areacode: district.areacode,
      sigungucode: district.sigungucode,
    });
  };

  // **검색 필드 변화 처리**
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === "") {
      // 검색어가 없으면 전체 데이터 가져오기
      loadDistricts();
    } else {
      // 서버에서 검색 실행
      searchDistricts(keyword);
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white rounded shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">District Management</h1>

        {message && <p className="mb-4 text-center text-green-500">{message}</p>}

        {/* 검색 필드 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Address, Area Code, or Sigungu Code"
            value={searchKeyword}
            onChange={handleSearch}
            className="w-full p-2 border rounded"
          />
        </div>

        <form
          className="grid grid-cols-2 gap-4 mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            selectedDistrict ? updateDistrict() : createDistrict();
          }}
        >
          <input
            type="text"
            name="addr1"
            placeholder="Address 1"
            value={formData.addr1}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="addr2"
            placeholder="Address 2"
            value={formData.addr2}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="areacode"
            placeholder="Area Code"
            value={formData.areacode}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="sigungucode"
            placeholder="Sigungu Code"
            value={formData.sigungucode}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="col-span-2 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            {selectedDistrict ? "Update District" : "Create District"}
          </button>
          {selectedDistrict && (
            <button
              type="button"
              onClick={() => setSelectedDistrict(null)}
              className="col-span-2 py-2 text-gray-700 transition bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </form>

        <table className="w-full border border-collapse border-gray-300 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300">No</th>
              <th className="p-2 border border-gray-300">Address 1</th>
              <th className="p-2 border border-gray-300">Address 2</th>
              <th className="p-2 border border-gray-300">Area Code</th>
              <th className="p-2 border border-gray-300">Sigungu Code</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district) => (
              <tr key={district.no} className="hover:bg-gray-100">
                <td className="p-2 text-center border border-gray-300">{district.no}</td>
                <td className="p-2 text-center border border-gray-300">{district.addr1}</td>
                <td className="p-2 text-center border border-gray-300">{district.addr2}</td>
                <td className="p-2 text-center border border-gray-300">{district.areacode}</td>
                <td className="p-2 text-center border border-gray-300">{district.sigungucode}</td>
                <td className="flex justify-center gap-2 p-2 border border-gray-300">
                  <button
                    onClick={() => handleEditClick(district)}
                    className="px-2 py-1 text-white transition bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDistrict(district.no)}
                    className="px-2 py-1 text-white transition bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictDisplay;

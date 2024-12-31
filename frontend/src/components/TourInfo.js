import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TourInfo = () => {
  const [tourInfos, setTourInfos] = useState([]); // Tour 정보 상태
  const [pageNo, setPageNo] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [pageRange, setPageRange] = useState([1, 10]); // 현재 페이지 범위
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  // 서버로부터 데이터를 가져오는 함수
  const loadTourInfos = async (page) => {
    setIsLoading(true);
    try {
      const url = `http://localhost:8080/tourinfo?pageNo=${page}`;
      const response = await axios.get(url);

      // 데이터 업데이트
      const newTourInfos = response.data.content || [];
      setTourInfos(newTourInfos);
      setTotalPages(response.data.totalPages || 1); // 전체 페이지 수 업데이트
    } catch (error) {
      console.error("Error fetching tour info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadTourInfos(pageNo);
  }, [pageNo]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNo(newPage);
    }
  };

  // 페이지 범위 변경 핸들러
  const handleNextRange = () => {
    const [start, end] = pageRange;
    const newStart = Math.min(start + 10, totalPages - 9);
    const newEnd = Math.min(end + 10, totalPages);
    setPageRange([newStart, newEnd]);
  };

  const handlePrevRange = () => {
    const [start, end] = pageRange;
    const newStart = Math.max(start - 10, 1);
    const newEnd = Math.min(newStart + 9, totalPages);
    setPageRange([newStart, newEnd]);
  };

  // 항목 클릭 시 서버에서 contentId를 요청하고 상세 페이지로 이동
  const handleItemClick = async (contentid) => {
    try {
      // 서버로 contentId 요청
      const response = await axios.post("http://localhost:8080/tourinfo/getcontentid", { contentid });
      const serverContentid = response.data; // 서버에서 받은 contentId
      navigate(`/traveldetail/${serverContentid}`); // TravelDetail 페이지로 이동
    } catch (error) {
      console.error("Error fetching contentId from server:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center">Tour Information</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tourInfos.map((info, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded shadow cursor-pointer hover:shadow-md"
            onClick={() => handleItemClick(info.contentid)} // 서버 요청 추가
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

      {/* 로딩 중일 때 로딩 메시지 */}
      {isLoading && (
        <p className="mt-6 text-center text-gray-600">Loading...</p>
      )}

      {/* 페이지 번호 버튼 */}
      <div className="flex justify-center mt-6 space-x-2">
        {pageRange[0] > 1 && (
          <button
            className="px-3 py-1 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
            onClick={handlePrevRange}
          >
            이전페이지
          </button>
        )}
        {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, i) => (
          <button
            key={pageRange[0] + i}
            className={`px-3 py-1 border rounded ${
              pageNo === pageRange[0] + i
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 border-gray-400 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(pageRange[0] + i)}
          >
            {pageRange[0] + i}
          </button>
        ))}
        {pageRange[1] < totalPages && (
          <button
            className="px-3 py-1 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
            onClick={handleNextRange}
          >
            다음페이지
          </button>
        )}
      </div>
    </div>
  );
};

export default TourInfo;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TourInfo = () => {
//   const [tourInfos, setTourInfos] = useState([]); // Tour 정보 상태
//   const [pageNo, setPageNo] = useState(1); // 현재 페이지 번호
//   const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
//   const [isLoading, setIsLoading] = useState(false); // 로딩 상태
//   const [pageRange, setPageRange] = useState([1, 10]); // 현재 페이지 범위
//   const navigate = useNavigate(); // 페이지 이동을 위한 navigate

//   const [categories, setCategories] = useState([]); // 카테고리 데이터
//   const [selectedAreaCode, setSelectedAreaCode] = useState("");
//   const [selectedSigunguCode, setSelectedSigunguCode] = useState("");
//   const [selectedContentTypeId, setSelectedContentTypeId] = useState("");
//   const [filteredSigungu, setFilteredSigungu] = useState([]);
//   const [filteredTourInfos, setFilteredTourInfos] = useState([]); // 필터링된 Tour 정보

//   // 서버로부터 Tour 정보를 가져오는 함수
//   const loadTourInfos = async (page) => {
//     setIsLoading(true);
//     try {
//       const url = `http://localhost:8080/tourinfo?pageNo=${page}`;
//       const response = await axios.get(url);
//       const newTourInfos = response.data.content || [];
//       setTourInfos(newTourInfos);
//       setTotalPages(response.data.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching tour info:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 카테고리 초기 데이터 로드
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const data = [
//         { addr1: "서울특별시", addr2: "강남구", areacode: "1", sigungucode: "1" },
//         { addr1: "서울특별시", addr2: "강동구", areacode: "1", sigungucode: "2" },
//         // 추가 데이터...
//       ];
//       setCategories(data);
//     };
//     fetchCategories();
//   }, []);

//   // 시/도 선택 시 시/군/구 목록 필터링
//   useEffect(() => {
//     const filtered = categories.filter((item) => item.areacode === selectedAreaCode);
//     setFilteredSigungu(filtered);
//     setSelectedSigunguCode(""); // 시/군/구 선택 초기화
//   }, [selectedAreaCode]);

//   // 필터링된 Tour 정보 자동 로드
//   useEffect(() => {
//     const fetchFilteredTourInfos = async () => {
//       if (!selectedAreaCode || !selectedSigunguCode || !selectedContentTypeId) return;

//       setIsLoading(true);
//       try {
//         const url = `http://localhost:8080/tourinfo/category?sigungucode=${selectedSigunguCode}&areacode=${selectedAreaCode}&contenttypeid=${selectedContentTypeId}`;
//         const response = await axios.get(url);
//         setFilteredTourInfos(response.data || []);
//       } catch (error) {
//         console.error("Error fetching filtered tour info:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFilteredTourInfos();
//   }, [selectedAreaCode, selectedSigunguCode, selectedContentTypeId]);

//   // 페이지 변경 핸들러
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPageNo(newPage);
//     }
//   };

//   // 항목 클릭 시 상세 페이지로 이동
//   const handleItemClick = async (contentid) => {
//     try {
//       const response = await axios.post("http://localhost:8080/tourinfo/getcontentid", { contentid });
//       const serverContentid = response.data;
//       navigate(`/traveldetail/${serverContentid}`);
//     } catch (error) {
//       console.error("Error fetching contentId from server:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h1 className="mb-6 text-3xl font-bold text-center">Tour Information</h1>

//       {/* 카테고리 선택 UI */}
//       <div className="mb-6">
//         <h2 className="mb-4 text-lg font-semibold">카테고리 선택</h2>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           <select
//             value={selectedAreaCode}
//             onChange={(e) => setSelectedAreaCode(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">시/도를 선택하세요</option>
//             {[...new Set(categories.map((item) => item.areacode))].map((areacode) => (
//               <option key={areacode} value={areacode}>
//                 {categories.find((item) => item.areacode === areacode).addr1}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedSigunguCode}
//             onChange={(e) => setSelectedSigunguCode(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">시/군/구를 선택하세요</option>
//             {filteredSigungu.map((item) => (
//               <option key={item.sigungucode} value={item.sigungucode}>
//                 {item.addr2}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedContentTypeId}
//             onChange={(e) => setSelectedContentTypeId(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">콘텐츠 유형을 선택하세요</option>
//             <option value="12">관광지</option>
//             <option value="14">문화시설</option>
//             <option value="15">축제/공연/행사</option>
//             <option value="25">여행코스</option>
//             <option value="28">레포츠</option>
//             <option value="32">숙박</option>
//             <option value="38">쇼핑</option>
//             <option value="39">음식점</option>
//           </select>
//         </div>
//       </div>

//       {/* 필터링된 Tour 정보 표시 */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {(filteredTourInfos.length > 0 ? filteredTourInfos : tourInfos).map((info, index) => (
//           <div
//             key={index}
//             className="p-4 bg-white border rounded shadow cursor-pointer hover:shadow-md"
//             onClick={() => handleItemClick(info.contentid)}
//           >
//             <img
//               src={info.firstimage || "https://via.placeholder.com/300"}
//               alt={info.title || "No Image"}
//               className="object-cover w-full h-48 rounded-md"
//             />
//             <h2 className="mt-4 text-lg font-bold">{info.title}</h2>
//             <p className="mt-2 text-sm text-gray-600">{info.addr1}</p>
//           </div>
//         ))}
//       </div>

//       {/* 로딩 중일 때 로딩 메시지 */}
//       {isLoading && <p className="mt-6 text-center text-gray-600">Loading...</p>}

//       {/* 페이지 번호 버튼 */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {pageRange[0] > 1 && (
//           <button
//             className="px-3 py-1 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
//             onClick={() => handlePageChange(pageRange[0] - 1)}
//           >
//             이전페이지
//           </button>
//         )}
//         {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, i) => (
//           <button
//             key={pageRange[0] + i}
//             className={`px-3 py-1 border rounded ${
//               pageNo === pageRange[0] + i
//                 ? "bg-blue-500 text-white border-blue-500"
//                 : "bg-gray-200 border-gray-400 hover:bg-gray-300"
//             }`}
//             onClick={() => handlePageChange(pageRange[0] + i)}
//           >
//             {pageRange[0] + i}
//           </button>
//         ))}
//         {pageRange[1] < totalPages && (
//           <button
//             className="px-3 py-1 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
//             onClick={() => handlePageChange(pageRange[1] + 1)}
//           >
//             다음페이지
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TourInfo;


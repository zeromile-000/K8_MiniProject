// import React, { useEffect, useState } from "react";

// function TravelDetail() {
//   const [travelData, setTravelData] = useState(null);
//   const [error, setError] = useState(null); // 에러 상태 추가

//   // API 호출
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = process.env.REACT_APP_API_KEY; // 환경변수에서 API 키를 불러옴
//         if (!apiKey) {
//           throw new Error("API Key가 설정되지 않았습니다.");
//         }
        
//         const url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=126508&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`;
        
//         console.log("API 요청 URL:", url); // 요청 URL 디버깅
        
//         const response = await fetch(url);
        
//         if (!response.ok) {
//           throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log("API 응답 데이터:", result); // API 응답 디버깅
        
//         const item = result.response.body.items.item[0];
//         if (!item) {
//           throw new Error("API 응답에 item 데이터가 없습니다.");
//         }

//         setTravelData({
//           title: item.title,
//           image: item.firstimage,
//           address: item.addr1,
//           latitude: item.mapy,
//           longitude: item.mapx,
//           overview: item.overview,
//         });
//       } catch (err) {
//         console.error("API 호출 중 오류:", err);
//         setError(err.message);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (travelData) {
//       try {
//         const script = document.createElement("script");
//         const kakao_API = process.env.REACT_APP_KAKAO_MAP_KEY; // 환경변수에서 Kakao API 키를 불러옴

//         if (!kakao_API) {
//           throw new Error("Kakao Map API Key가 설정되지 않았습니다.");
//         }

//         script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_API}&autoload=false`;
//         script.async = true;
//         document.head.appendChild(script);

//         script.onload = () => {
//           window.kakao.maps.load(() => {
//             const container = document.getElementById("map"); // 지도 표시 영역
//             const options = {
//               center: new window.kakao.maps.LatLng(travelData.latitude, travelData.longitude),
//               level: 3,
//             };
//             const map = new window.kakao.maps.Map(container, options);

//             // 마커 추가
//             new window.kakao.maps.Marker({
//               position: new window.kakao.maps.LatLng(travelData.latitude, travelData.longitude),
//               map: map,
//             });

//             console.log("Kakao Map이 성공적으로 로드되었습니다.");
//           });
//         };

//         script.onerror = () => {
//           throw new Error("Kakao Map 스크립트를 로드할 수 없습니다.");
//         };
//       } catch (err) {
//         console.error("Kakao Map 로드 중 오류:", err);
//         setError(err.message);
//       }
//     }
//   }, [travelData]);

//   if (error) {
//     return (
//       <div className="text-center text-red-500">
//         오류가 발생했습니다: {error}
//       </div>
//     );
//   }

//   if (!travelData) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container p-4 mx-auto">
//       {/* 제목 */}
//       <h1 className="mb-4 text-3xl font-bold">{travelData.title}</h1>

//       {/* 이미지 */}
//       <img
//         src={travelData.image}
//         alt={travelData.title}
//         className="w-full h-auto mb-6 rounded"
//       />

//       {/* 주소 */}
//       <p className="mb-6 text-lg text-gray-700">주소: {travelData.address}</p>

//       {/* 지도 */}
//       <div id="map" className="w-full h-64 mb-6 rounded shadow"></div>

//       {/* 상세정보 */}
//       <div className="p-4 bg-gray-100 rounded shadow">
//         <h2 className="mb-4 text-2xl font-bold">상세정보</h2>
//         <p className="text-gray-700">{travelData.overview}</p>
//       </div>
//     </div>
//   );
// }

// export default TravelDetail;

import React, { useEffect, useState, useRef } from "react";

function TravelDetail() {
  const [travelData, setTravelData] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const mapRef = useRef(null); // 지도 DOM 참조

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY; // 환경변수에서 API 키를 불러옴
        if (!apiKey) {
          throw new Error("API Key가 설정되지 않았습니다.");
        }

        const url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=126508&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const result = await response.json();
        const item = result.response.body.items.item[0];

        setTravelData({
          title: item.title,
          image: item.firstimage,
          address: item.addr1,
          latitude: item.mapy,
          longitude: item.mapx,
          overview: item.overview,
        });
      } catch (err) {
        console.error("API 호출 중 오류:", err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    const kakao_API = process.env.REACT_APP_KAKAO_MAP_KEY;

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakao_API}&autoload=false`;
    script.async = true;

    script.onload = () => {
      setIsKakaoMapLoaded(true);
    };

    script.onerror = () => {
      setError("Kakao Map 스크립트를 로드하지 못했습니다.");
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (isKakaoMapLoaded && travelData) {
      try {
        const options = {
          center: new window.kakao.maps.LatLng(travelData.latitude, travelData.longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        const markerPosition = new window.kakao.maps.LatLng(
          travelData.latitude,
          travelData.longitude
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        const content = `<div class="customoverlay">
          <span class="title">${travelData.title}</span>
        </div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1,
        });

        customOverlay.setMap(map);
      } catch (err) {
        setError("Kakao Map 초기화 중 오류가 발생했습니다.");
      }
    }
  }, [isKakaoMapLoaded, travelData]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!travelData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{travelData.title}</h1>
      <img src={travelData.image} alt={travelData.title} className="w-full h-auto mb-6 rounded" />
      <p className="mb-6 text-lg text-gray-700">주소: {travelData.address}</p>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} className="rounded shadow"></div>
      <div className="p-4 mt-6 bg-gray-100 rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">상세정보</h2>
        <p className="text-gray-700">{travelData.overview}</p>
      </div>
    </div>
  );
}

export default TravelDetail;

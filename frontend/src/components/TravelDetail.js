import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function TravelDetail() {
  const { contentid } = useParams(); // URL에서 contentId 가져오기
  const [travelData, setTravelData] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const mapRef = useRef(null); // 지도 DOM 참조

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY; // 환경변수에서 API 키를 불러옴
        if (!apiKey) {
          throw new Error("API Key가 설정되지 않았습니다.");
        }

        // contentId를 기반으로 API 호출
        const url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`;

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
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    if (contentid) {
      fetchData(); // contentId가 있을 때만 호출
    }
  }, [contentid]);

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

        // 심플한 빨간색 마커 스타일 설정
        const markerPosition = new window.kakao.maps.LatLng(
          travelData.latitude,
          travelData.longitude
        );

        const markerContent = `<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%; position: absolute; transform: translate(-50%, -50%);"></div>`;

        const customMarker = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: markerContent,
          map: map,
        });

        // 커스텀 오버레이 콘텐츠
        const overlayContent = `
          <div style="background: white; border: 1px solid #ccc; padding: 8px; border-radius: 4px; box-shadow: 0px 2px 4px rgba(0,0,0,0.2);">
            <a href="https://map.kakao.com/link/map/${travelData.title},${travelData.latitude},${travelData.longitude}" target="_blank" style="color: #333; text-decoration: none; font-weight: bold;">
              ${travelData.title}
            </a>
          </div>
        `;

        // 커스텀 오버레이 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: overlayContent,
          yAnchor: 1.5,
        });

        customOverlay.setMap(map);
      } catch (err) {
        setError("Kakao Map 초기화 중 오류가 발생했습니다.");
      }
    }
  }, [isKakaoMapLoaded, travelData]);

  if (isLoading) {
    return <div className="font-medium text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="font-semibold text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl p-4 mx-auto bg-white rounded-md shadow">
      <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">{travelData.title}</h1>
      <img
        src={travelData.image}
        alt={travelData.title}
        className="w-full h-auto mb-6 rounded-md shadow"
      />
      <p className="mb-6 text-lg text-gray-700">주소: {travelData.address}</p>
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} className="mb-6 rounded-md shadow"></div>
      <div className="p-4 rounded-md shadow bg-gray-50">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">상세정보</h2>
        <p className="leading-relaxed text-gray-700">{travelData.overview}</p>
      </div>
    </div>
  );
}

export default TravelDetail;

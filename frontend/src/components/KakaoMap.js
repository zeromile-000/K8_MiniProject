// import React, { useEffect, useRef } from 'react';

// const KakaoMap = () => {
//   const mapContainer = useRef(null); // 지도를 표시할 div를 참조

//   useEffect(() => {
//     // Kakao Maps API 스크립트 로드
//     const script = document.createElement('script');
//     script.src =
//       '//dapi.kakao.com/v2/maps/sdk.js?appkey=b376ac2b6a55d7841d4aaf7f08fa3d99&autoload=false';
//     script.async = true;

//     script.onload = () => {
//       // Kakao Maps SDK가 로드되면 실행
//       window.kakao.maps.load(async () => {
//         // 지도 옵션 설정
//         const mapOption = {
//           center: new window.kakao.maps.LatLng(37.56796, 126.97937), // 지도 중심 좌표
//           level: 4, // 확대 레벨 (숫자가 작을수록 확대)
//         };

//         // 지도 생성
//         const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

//         // 1. API 호출: 백엔드에서 좌표 데이터 가져오기
//         const markerData = await fetchMarkers(); // fetchMarkers 함수 호출

//         // 2. 가져온 데이터로 마커 생성
//         markerData.forEach((data) => {
//           // 2.1. 마커 생성
//           const marker = new window.kakao.maps.Marker({
//             position: new window.kakao.maps.LatLng(data.y, data.x), // 위도(y), 경도(x)
//             map: map, // 마커를 표시할 지도 객체
//           });

//           // 2.2. 마커 클릭 이벤트
//           window.kakao.maps.event.addListener(marker, 'click', () => {
//             alert(`${data.title} 마커를 클릭했습니다!`); // 클릭 시 알림창 표시
//           });
//         });
//       });
//     };

//     document.head.appendChild(script); // script를 <head>에 추가

//     // 컴포넌트 언마운트 시 스크립트 제거
//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   // 백엔드에서 마커 데이터를 가져오는 함수
//   const fetchMarkers = async () => {
//     try {
//       // 1. 백엔드 API 호출
//       const response = await fetch('http://localhost:8080/kakaomap'); // 백엔드 API URL
//       const data = await response.json(); // 응답을 JSON으로 변환
//       return data; // [{ title: "장소1", x: 127.027, y: 37.497 }, ...]
//     } catch (error) {
//       // 2. 오류 처리
//       console.error('Error fetching marker data:', error);
//       return []; // 오류 시 빈 배열 반환
//     }
//   };

//   return (
//     <div
//       ref={mapContainer} // 지도를 렌더링할 컨테이너를 참조
//       style={{
//         width: '100%', // 지도 너비
//         height: '800px', // 지도 높이
//       }}
//     ></div>
//   );
// };

// export default KakaoMap;
import React, { useEffect, useRef } from 'react';

const KakaoMap = () => {
  const mapContainer = useRef(null); // 지도를 표시할 div를 참조

  useEffect(() => {
    // Kakao Maps API 스크립트 로드
    const script = document.createElement('script');
    const apikey = 
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=b376ac2b6a55d7841d4aaf7f08fa3d99&autoload=false';
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(35.2371, 129.0772), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
          mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도 종류
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

        // 지도 타입 변경 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        // 확대/축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(35.2371, 129.0772), // 마커 좌표
          draggable: true, // 드래그 가능
          map: map, // 마커를 표시할 지도 객체
        });

        // 마커 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', () => {
          alert('마커를 클릭했습니다!');
        });
      });
    };

    document.head.appendChild(script);

    // 클린업: 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '800px',
      }}
    ></div>
  );
};

export default KakaoMap;

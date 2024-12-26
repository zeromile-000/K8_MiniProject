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
          center: new window.kakao.maps.LatLng(37.56796, 126.97937), // 지도의 중심좌표
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
          position: new window.kakao.maps.LatLng(37.56796, 126.97937), // 마커 좌표
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

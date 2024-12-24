// import React, { useState } from 'react'


// https://apis.data.go.kr/B551011/KorService1/detailCommon1?
// serviceKey=uBSmr7z03f20VpfRoX%2BKCs%2B70B4BgwEVZdGTWrnanJ4jX9qdyqvbPTPER2Fc9P7Ku5Bh%2FsQvLQvEu7ldiDP6yA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=126508&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1

// export default function AllData() {
//   const [data, setData] = useState([]);
    
//   const getFetchData = () => {
//     const apikey = process.env.API_KEY;
//     const dt = '20240929';

//     let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`;
//     url = `${url}key=${apikey}&targetDt=${dt}`;

//     console.log("apikey =", apikey);
//     console.log(url);

//     // 데이터 가져오기
//     fetch(url)
//       .then(resp => resp.json())
//       .then(data => setData())
//       .catch(err => console.log(err));
//   };

//   return (
//     <div>
      
//     </div>
//   )
// }

package com.TripOrganizer.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TripOrganizer.domain.District;


public interface DistrictRepository extends JpaRepository<District, Long>{
	
	// 주소1 또는 주소2에 키워드가 포함된 데이터를 검색
    List<District> findByAddr1ContainingIgnoreCaseOrAddr2ContainingIgnoreCase(String addr1, String addr2);
//    List<District> findByCategory(String category); // 카테고리 검색
   

}

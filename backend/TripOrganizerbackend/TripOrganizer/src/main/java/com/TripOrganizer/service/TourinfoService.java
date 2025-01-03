package com.TripOrganizer.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.domain.dto.RequestDto;
import com.TripOrganizer.persistence.TourinfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourinfoService {

    private final TourinfoRepository tourinfoRepository;

    // 특정 ID로 Tourinfo 반환
    public Long getContentId(Long contentid) {
        return tourinfoRepository.findByContentid(contentid)
                .map(Tourinfo::getContentid)
                .orElseThrow(() -> new IllegalArgumentException("ContentId not found in DB"));
    }
    

    public Page<Tourinfo> getLimitedTourInfos(int pageNo) { 
    	Pageable pageable = PageRequest.of(pageNo, 16); 
        return tourinfoRepository.findAll(pageable);
    }
    
    public List<Tourinfo> getCategoryInfos (int sigungucode, int areacode, int contenttypeid){
    	return tourinfoRepository.queryAnnotationTest1(sigungucode, areacode, contenttypeid);
    }


	public Page<Tourinfo> getLimitedTourInfos(RequestDto dto) {
		Integer pageNo = dto.getPageNo();
		if (pageNo == null) pageNo = 1;
		
		Pageable pageable = PageRequest.of(pageNo-1, 16); 

		Page<Tourinfo> ret = null;

		if (dto.getAddr1() == null) {
			if (dto.getCategory() == null)
				// [1]. 필터없이 모두 검색
				ret = tourinfoRepository.findAll(pageable);
			else
				// 2. 타입으로만 검색
				ret = tourinfoRepository.findByContenttypeid(dto.getCategory(), pageable);
		}
		else if (dto.getAddr2() == null) {
			if (dto.getCategory() == null)
				// 시도만으로 검색
				ret = tourinfoRepository.findByAreacode(dto.getAddr1(), pageable);
			else
				// 3. 시도, 타입으로만 검색
				ret = tourinfoRepository.findByAreacodeAndContenttypeid(dto.getAddr1(), dto.getCategory(), pageable);
		}
		else if (dto.getCategory() == null) {
			// 4. 시도, 시군구로 검색
			ret = tourinfoRepository.findByAreacodeAndSigungucode(dto.getAddr1(), dto.getAddr2(), pageable);
		}
		else {
			// [5]. 시도, 시군구, 타입으로만 검색
			ret = tourinfoRepository.findByAreacodeAndSigungucodeAndContenttypeid(
					dto.getAddr1(),
					dto.getAddr2(),
					dto.getCategory(),
					pageable);
		}
		return ret;
	}
    
//    public Page<Tourinfo> getCategoryInfos2 (int sigungucode, int areacode, int contenttypeid, int pageNo){
//    	Pageable pageable = PageRequest.of(pageNo, 16); 
//    	return tourinfoRepository.findBySigungucodeAndAreacodeAndContentid(sigungucode, areacode, contenttypeid, pageable);
//    }
    
   
}


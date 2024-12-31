package com.TripOrganizer.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Tourinfo;
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
    
   
}


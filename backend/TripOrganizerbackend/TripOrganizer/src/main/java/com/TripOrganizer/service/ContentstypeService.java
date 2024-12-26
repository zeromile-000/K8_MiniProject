package com.TripOrganizer.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Contentstype;
import com.TripOrganizer.persistence.ContentstypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContentstypeService {
	
private final ContentstypeRepository contentstypeRepository;
	
	public List<Contentstype> getAllDistricts() {
        return contentstypeRepository.findAll();
    }

    public Contentstype getDistrictById(Long no) {
        return contentstypeRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));
    }

}

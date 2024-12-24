package com.TripOrganizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.persistence.TourinfoRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TourinfoService {
	
	public List<Tourinfo> getAllDistricts() {
        return TourinfoRepository.findAll();
    }

    // **[READ] 특정 District 조회**
    public Tourinfo getDistrictById(Long no) {
        return TourinfoRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));
    }

}

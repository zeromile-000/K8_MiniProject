package com.TripOrganizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.persistence.TourinfoRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class TourinfoService {
	
	private final TourinfoRepository tourinfoRepository;
	
	public List<Tourinfo> getAllDistricts() {
        return tourinfoRepository.findAll();
    }

    public Tourinfo getDistrictById(Long no) {
        return tourinfoRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));
    }

}

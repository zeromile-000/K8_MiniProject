package com.TripOrganizer.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.persistence.TourinfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourinfoService {

    private final TourinfoRepository tourinfoRepository;

    // 특정 ID로 Tourinfo 반환
    public Tourinfo getDistrictById(Long no) {
        return tourinfoRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));
    }

    public List<Tourinfo> getLimitedTourInfos(int limit) { // 10개로 제한
        return tourinfoRepository.findTopN(limit);
    }
}


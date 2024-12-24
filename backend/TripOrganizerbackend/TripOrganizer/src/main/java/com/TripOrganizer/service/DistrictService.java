package com.TripOrganizer.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.District;
import com.TripOrganizer.persistence.DistrictRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DistrictService {

    private final DistrictRepository districtRepository;

    // **[READ] 모든 District 조회**
    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    // **[READ] 특정 District 조회**
    public District getDistrictById(Long no) {
        return districtRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));
    }

    // **[CREATE] 새 District 추가**
    public District createDistrict(District district) {
        return districtRepository.save(district);
    }

    // **[UPDATE] 특정 District 수정**
    public District updateDistrict(Long no, District updatedDistrict) {
        District existingDistrict = districtRepository.findById(no)
                .orElseThrow(() -> new RuntimeException("District not found with no " + no));

        existingDistrict.setAddr1(updatedDistrict.getAddr1());
        existingDistrict.setAddr2(updatedDistrict.getAddr2());
        existingDistrict.setAreacode(updatedDistrict.getAreacode());
        existingDistrict.setSigungucode(updatedDistrict.getSigungucode());

        return districtRepository.save(existingDistrict);
    }

    // **[DELETE] 특정 District 삭제**
    public void deleteDistrict(Long no) {
        districtRepository.deleteById(no);
    }
    public List<District> searchDistricts(String keyword) {
        return districtRepository.findByAddr1ContainingIgnoreCaseOrAddr2ContainingIgnoreCase(keyword, keyword);
    }
 
}

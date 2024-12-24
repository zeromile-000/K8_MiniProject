package com.TripOrganizer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.TripOrganizer.domain.District;
import com.TripOrganizer.service.DistrictService;

import java.util.List;

@RestController
@RequestMapping("/district")
@RequiredArgsConstructor
public class DistrictController {

    private final DistrictService districtService;

    // **[READ] 모든 District 조회**
    @GetMapping
    public List<District> getAllDistricts() {
        return districtService.getAllDistricts();
    }

    // **[READ] 특정 District 조회**
    @GetMapping("/{no}")
    public District getDistrictById(@PathVariable Long no) {
        return districtService.getDistrictById(no);
    }

    // **[CREATE] 새 District 추가**
    @PostMapping
    public District createDistrict(@RequestBody District district) {
        return districtService.createDistrict(district);
    }

    // **[UPDATE] 특정 District 수정**
    @PutMapping("/{no}")
    public District updateDistrict(@PathVariable Long no, @RequestBody District updatedDistrict) {
        return districtService.updateDistrict(no, updatedDistrict);
    }

    // **[DELETE] 특정 District 삭제**
    @DeleteMapping("/{no}")
    public void deleteDistrict(@PathVariable Long no) {
        districtService.deleteDistrict(no);
    }
    
    @GetMapping("/search")
    public List<District> searchDistricts(@RequestParam String keyword) {
        return districtService.searchDistricts(keyword);
    }
    
//    @GetMapping("/filter") // 카테고리 필터링 검색 예시
//    public List<District> filterByCategory(@RequestParam String category) {
//        return DistrictRepository.findByCategory(category);
//    }
    
}

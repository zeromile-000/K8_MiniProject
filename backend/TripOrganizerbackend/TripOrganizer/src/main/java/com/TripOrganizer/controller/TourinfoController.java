package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.District;
import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.service.TourinfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tourinfo")
@RequiredArgsConstructor
public class TourinfoController {
	 @GetMapping
	    public List<Tourinfo> getAllDistricts() {
	        return TourinfoService.getAllDistricts();
	    }

	    // **[READ] 특정 District 조회**
	    @GetMapping("/{no}")
	    public Tourinfo getDistrictById(@PathVariable Long no) {
	        return TourinfoService.getDistrictById(no);
	    }

}

package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.service.TourinfoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tourinfo")
@RequiredArgsConstructor
public class TourinfoController {

	private final TourinfoService tourinfoService;

	@GetMapping
	public List<Tourinfo> getAllDistricts() {
		return tourinfoService.getAllDistricts();
	}

	@GetMapping("/{no}")
	public Tourinfo getDistrictById(@PathVariable Long no) {
		return tourinfoService.getDistrictById(no);
	}

}

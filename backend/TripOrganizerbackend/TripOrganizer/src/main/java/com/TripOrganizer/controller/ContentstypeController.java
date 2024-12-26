package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.Contentstype;
import com.TripOrganizer.service.ContentstypeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/contentstype")
@RequiredArgsConstructor
public class ContentstypeController {
	
	private final ContentstypeService contentstypeService;
	
	@GetMapping
	public List<Contentstype> getAllDistricts() {
		return contentstypeService.getAllDistricts();
	}

	@GetMapping("/{no}")
	public Contentstype getDistrictById(@PathVariable Long no) {
		return contentstypeService.getDistrictById(no);
	}
}

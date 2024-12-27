package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public List<Tourinfo> getTourInfos(@RequestParam(defaultValue = "12") int limit) {
		return tourinfoService.getLimitedTourInfos(limit);
	}

	

}

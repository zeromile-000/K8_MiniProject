package com.TripOrganizer.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.domain.dto.RequestDto;
import com.TripOrganizer.service.TourinfoService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/tourinfo")
@RequiredArgsConstructor
public class TourinfoController {

	private final TourinfoService tourinfoService;

	@GetMapping
	public Page<Tourinfo> getTourInfos(RequestDto requestDto) {
		return tourinfoService.getLimitedTourInfos(requestDto);
	}
	
}

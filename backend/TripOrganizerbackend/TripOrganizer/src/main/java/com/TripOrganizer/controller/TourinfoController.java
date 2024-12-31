package com.TripOrganizer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public Page<Tourinfo> getTourInfos(Integer pageNo) {
		return tourinfoService.getLimitedTourInfos(pageNo);
	}
	 @PostMapping("/getcontentid")
	    public ResponseEntity<Long> getContentId(@RequestBody Map<String, Long> payload) {
	        Long contentId = payload.get("contentid");
	        Long dbContentId = tourinfoService.getContentId(contentId);
	        return ResponseEntity.ok(dbContentId);
	    }
	
	
	@GetMapping("/category")
	public List<Tourinfo> getsigungucode(int sigungucode, int areacode, int contenttypeid){
		return tourinfoService.getCategoryInfos(sigungucode, areacode, contenttypeid);
	}
	
	

	

}

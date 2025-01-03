package com.TripOrganizer.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

//	
	
	@GetMapping
	public Page<Tourinfo> getTourInfos(RequestDto requestDto) {
		return tourinfoService.getLimitedTourInfos(requestDto);
		
	}
	
	 @PostMapping("/getcontentid")
	    public ResponseEntity<Long> getContentId(@RequestBody Map<String, Long> payload) {
	        Long contentId = payload.get("contentid");
	        Long dbContentId = tourinfoService.getContentId(contentId);
	        return ResponseEntity.ok(dbContentId);
	    }
	
	
//	@GetMapping("/category")
//	public List<Tourinfo> getsigungucode(Integer sigungucode, Integer areacode, Integer contenttypeid, Integer pageno){
//		return tourinfoService.getCategoryInfos(sigungucode, areacode, contenttypeid);
//	}

	//@GetMapping
//	public Page<Tourinfo> getTourInfos(@RequestParam Integer pageNo) {
//		return tourinfoService.getLimitedTourInfos(pageNo);
//	}
	
	
	

}

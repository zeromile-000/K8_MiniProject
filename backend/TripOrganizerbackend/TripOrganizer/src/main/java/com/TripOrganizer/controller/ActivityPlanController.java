package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.ActivityPlan;
import com.TripOrganizer.domain.dto.ActivityPlanDTO;
import com.TripOrganizer.domain.dto.ActivityPlanRequest;
import com.TripOrganizer.service.ActivityPlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/activityplan")
@RequiredArgsConstructor
public class ActivityPlanController {

    @Autowired
    private final ActivityPlanService activityPlanService;

    @PostMapping // 여행 예약 데이터 생성
    public void createActivityPlan(@RequestBody ActivityPlanRequest activityPlanRequest) {
        activityPlanService.createActivityPlan(activityPlanRequest);
    }

    @GetMapping // planId를 기반으로 여행 예약 데이터 조회 
    public ResponseEntity<?> findByPlanId(Long planId) {
        List<ActivityPlan> list = activityPlanService.findByPlanId(planId);
        List<ActivityPlanDTO> ret = list.stream()
            .map(ap -> new ActivityPlanDTO(
                ap.getIndexId(),
                ap.getContentS(),
                ap.getContentE(),
                ap.getDayIndex(),
                ap.getCreatedAt(),
                ap.getPlanlist().getPlanId(),
                ap.getTourinfo().getContentid(),
                ap.getTourinfo().getTitle()
            		)).toList();
        return ResponseEntity.ok(ret);
    }
    
    @PutMapping // indexId를 기준으로 여행 예약 데이터 수정
    public ResponseEntity<ActivityPlan> updateActivityPlan(@RequestParam Long indexId, @RequestBody ActivityPlan ActivityPlan) {
        ActivityPlan updatedPlan = activityPlanService.updateActivityPlan(indexId, ActivityPlan);
        return ResponseEntity.ok(updatedPlan);
    }
    
    @DeleteMapping // no을 기준으로 여행 예약 데이터 삭제
    public void deleteActivityPlan(Long no) {
        activityPlanService.deleteActivityPlan(no);
    }
}
package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.ActivityPlan;
import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.dto.ActivityPlanRequest;
import com.TripOrganizer.domain.dto.ActivityPlanResponse;
import com.TripOrganizer.service.ActivityPlanService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/activityplan")
@RequiredArgsConstructor
public class ActivityPlanController {

    @Autowired
    private final ActivityPlanService activityPlanService;

    @PostMapping
    public void createActivityPlan(@RequestBody ActivityPlanRequest activityPlanRequest) {
        activityPlanService.createActivityPlan(activityPlanRequest);
    }

    @GetMapping
    public List<ActivityPlan> findByPlanId(Long planId) {
    	List<ActivityPlan> list = activityPlanService.findByPlanId(planId);
    	return list;
    }

    @DeleteMapping
    public void deleteActivityPlan(Long id) {
        activityPlanService.deleteActivityPlan(id);
    }
}
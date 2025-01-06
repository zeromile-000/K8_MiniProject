package com.TripOrganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.dto.PlanlistRequest;
import com.TripOrganizer.service.PlanlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/planlist")
@RequiredArgsConstructor
public class PlanlistController {
	
	@Autowired
    private PlanlistService planlistService;

    @PostMapping
    public void startPlan(@RequestBody PlanlistRequest planlistRequest) {
        planlistService.createPlan(planlistRequest);
    }
    
    @GetMapping
    public List<Planlist> getAllPlans(String username) {
    	return planlistService.findByUsername(username);
    }

//    @PutMapping("/{id}")
//    public Planlist updatePlan(@PathVariable Long id, @RequestBody Planlist updatedPlan) {
//        return planlistService.updatePlan(id, updatedPlan);
//    }

    @DeleteMapping
    public void deletePlan(Long id) {
        planlistService.deletePlan(id);
    }
}
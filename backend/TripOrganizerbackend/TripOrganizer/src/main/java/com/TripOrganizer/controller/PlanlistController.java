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

import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.dto.PlanlistDTO;
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
    public List<PlanlistDTO> getAllPlans(@RequestParam String username) {
        return planlistService.findByUsername(username);
    }
    
    @PutMapping
    public ResponseEntity<Planlist> updatePlan(@RequestParam Long id, @RequestBody Planlist planlist) {
        Planlist updatedPlan = planlistService.updatePlan(id, planlist);
        return ResponseEntity.ok(updatedPlan);
    }

    @DeleteMapping
    public void deletePlan(Long id) {
        planlistService.deletePlan(id);
    }
}
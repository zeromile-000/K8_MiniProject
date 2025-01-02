//package com.TripOrganizer.controller;
//
//import com.TripOrganizer.domain.ActivityPlan;
//import com.TripOrganizer.service.ActivityPlanService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/activity-plans")
//@RequiredArgsConstructor
//public class ActivityPlanController {
//
//    private final ActivityPlanService activityPlanService;
//
//    // Create
//    @PostMapping
//    public ResponseEntity<ActivityPlan> createActivityPlan(@RequestBody ActivityPlan activityPlan) {
//        ActivityPlan createdPlan = activityPlanService.createActivityPlan(activityPlan);
//        return ResponseEntity.ok(createdPlan);
//    }
//
//    // Read by ID
//    @GetMapping("/{plannername}")
//    public ResponseEntity<ActivityPlan> getActivityPlanById(@PathVariable String plannerName) {
//        Optional<ActivityPlan> activityPlan = activityPlanService.getActivityPlanByPlannerName(plannerName);
//        return activityPlan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // Read All
//    @GetMapping
//    public ResponseEntity<List<ActivityPlan>> getAllActivityPlans() {
//        List<ActivityPlan> activityPlans = activityPlanService.getAllActivityPlans();
//        return ResponseEntity.ok(activityPlans);
//    }
//
//    // Update
//    @PutMapping("/{plannerId}")
//    public ResponseEntity<ActivityPlan> updateActivityPlan(@PathVariable Long plannerId, @RequestBody ActivityPlan activityPlan) {
//        try {
//            ActivityPlan updatedPlan = activityPlanService.updateActivityPlan(plannerId, activityPlan);
//            return ResponseEntity.ok(updatedPlan);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // Delete
//    @DeleteMapping("/{plannerId}")
//    public ResponseEntity<Void> deleteActivityPlan(@PathVariable Long plannerId) {
//        activityPlanService.deleteActivityPlan(plannerId);
//        return ResponseEntity.noContent().build();
//    }
//}

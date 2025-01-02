//package com.TripOrganizer.service;
//
//import com.TripOrganizer.domain.ActivityPlan;
//import com.TripOrganizer.persistence.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class ActivityPlanServiceImpl implements ActivityPlanService {
//
//    private final ActivityPlanRepository activityPlanRepository;
//
//    @Override
//    public ActivityPlan createActivityPlan(ActivityPlan activityPlan) {
//        return activityPlanRepository.save(activityPlan);
//    }
//
//    @Override
//    public Optional<ActivityPlan> getActivityPlanByPlannerName(String plannerName) {
//        return activityPlanRepository.findByplannerName(plannerName);
//    }
//
//    @Override
//    public List<ActivityPlan> getAllActivityPlans() {
//        return activityPlanRepository.findAll();
//    }
//
//    @Override
//    public ActivityPlan updateActivityPlan(Long plannerId, ActivityPlan activityPlan) {
//        return activityPlanRepository.findById(plannerId)
//            .map(existingPlan -> {
//                existingPlan.setPlannerName(activityPlan.getPlannerName());
//                existingPlan.setPlannedDateTime(activityPlan.getPlannedDateTime());
//                existingPlan.setUser(activityPlan.getUser());
//                existingPlan.setTourInfo(activityPlan.getTourInfo());
//                return activityPlanRepository.save(existingPlan);
//            })
//            .orElseThrow(() -> new RuntimeException("ActivityPlan not found with ID: " + plannerId));
//    }
//
//    @Override
//    public void deleteActivityPlan(Long plannerId) {
//        activityPlanRepository.deleteById(plannerId);
//    }
//}

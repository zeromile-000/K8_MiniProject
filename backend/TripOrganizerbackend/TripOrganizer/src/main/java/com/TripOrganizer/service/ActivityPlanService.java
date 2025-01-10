package com.TripOrganizer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.ActivityPlan;
import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.domain.dto.ActivityPlanDTO;
import com.TripOrganizer.domain.dto.ActivityPlanRequest;
import com.TripOrganizer.persistence.ActivityPlanRepository;
import com.TripOrganizer.persistence.PlanlistRepository;
import com.TripOrganizer.persistence.TourinfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityPlanService {

	private final ActivityPlanRepository activityPlanRepository; // ActivityPlanRepository 레파지토리
	private final PlanlistRepository planlistRepository; // PlanlistRepository 레파지토리
	private final TourinfoRepository tourinfoRepository; // PlanlistRepository 레파지토리

	public void createActivityPlan(ActivityPlanRequest activityPlanRequest) {
		Planlist planlist = planlistRepository.findById(activityPlanRequest.getPlanId()).orElse(null); 
		Tourinfo tourinfo = tourinfoRepository.findById(activityPlanRequest.getContentId()).orElse(null); 
		ActivityPlan activityPlan = ActivityPlan.builder()
				.contentS(activityPlanRequest.getContentS()) // 입력받은 ContentS를
				.contentE(activityPlanRequest.getContentE()) // 입력받은 ContentE를 activityPlan에 저장
				.dayIndex(activityPlanRequest.getDayIndex()).planlist(planlist).tourinfo(tourinfo).build();
		activityPlanRepository.save(activityPlan);
	}

	public List<ActivityPlan> findByPlanId(Long planId) {
		Planlist p = planlistRepository.findById(planId).get();
		return p.getActivityPlans();
	}

	public ActivityPlan updateActivityPlan(Long indexId, ActivityPlan ActivityPlan) {
		return activityPlanRepository.findById(indexId).map(updatePlan -> {
			updatePlan.setContentS(ActivityPlan.getContentS() != null ? ActivityPlan.getContentS() : updatePlan.getContentS()); // 여행시작시간 수정
			updatePlan.setContentE(ActivityPlan.getContentE() != null ? ActivityPlan.getContentE() : updatePlan.getContentE()); // 여행종료시간 수정
			updatePlan.setDayIndex(ActivityPlan.getDayIndex() != null ? ActivityPlan.getDayIndex() : updatePlan.getDayIndex()); // N일차 수정
			return activityPlanRepository.save(updatePlan);
		}).orElseThrow(() -> new RuntimeException("ActivityPlan not found"));
	}

	// Delete (ActivityPlan 삭제)
	public void deleteActivityPlan(Long no) {
		activityPlanRepository.deleteById(no); // 일정을 삭제
	}

}

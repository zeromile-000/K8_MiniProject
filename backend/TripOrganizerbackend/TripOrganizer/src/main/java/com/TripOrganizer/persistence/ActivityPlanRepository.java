package com.TripOrganizer.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TripOrganizer.domain.ActivityPlan;
import com.TripOrganizer.domain.Planlist;

public interface ActivityPlanRepository extends JpaRepository<ActivityPlan, Long> {

	List<ActivityPlan> findByPlanlistPlanId(Long planId);

}

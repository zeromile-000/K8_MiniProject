package com.TripOrganizer.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Planlist;

@Repository
public interface PlanlistRepository extends JpaRepository<Planlist, Long> {
	List<Planlist> findByMemberUsername(String username);
}

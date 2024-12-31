package com.TripOrganizer.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TripOrganizer.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
	boolean existsByUsername(String username);

}

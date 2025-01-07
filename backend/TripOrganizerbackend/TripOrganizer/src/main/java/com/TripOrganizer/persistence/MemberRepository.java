package com.TripOrganizer.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TripOrganizer.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
	boolean existsByUsername(String username);

}

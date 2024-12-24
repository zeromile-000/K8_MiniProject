package com.TripOrganizer.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TripOrganizer.domain.Tourinfo;

public interface TourinfoRepository extends JpaRepository<Tourinfo, Long> {

}

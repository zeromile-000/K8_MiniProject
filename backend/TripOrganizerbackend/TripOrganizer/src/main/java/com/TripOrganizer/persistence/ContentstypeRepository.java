package com.TripOrganizer.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TripOrganizer.domain.Contentstype;

public interface ContentstypeRepository extends JpaRepository<Contentstype, Long> {

}

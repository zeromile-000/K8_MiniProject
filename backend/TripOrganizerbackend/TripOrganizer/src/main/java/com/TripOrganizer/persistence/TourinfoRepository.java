package com.TripOrganizer.persistence;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.TripOrganizer.domain.Tourinfo;

public interface TourinfoRepository extends JpaRepository<Tourinfo, Long> {
	
    @Query(value = "SELECT t FROM Tourinfo t ORDER BY t.no ASC")
    List<Tourinfo> findTopN(Pageable pageable);

    default List<Tourinfo> findTopN(int limit) {
        return findTopN(PageRequest.of(0, limit));
    }
	
}

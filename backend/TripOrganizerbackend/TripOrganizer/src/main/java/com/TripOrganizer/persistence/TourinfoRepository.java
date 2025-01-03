package com.TripOrganizer.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.TripOrganizer.domain.Tourinfo;

public interface TourinfoRepository extends JpaRepository<Tourinfo, Long> {
	
    Page<Tourinfo> findAll(Pageable pageable);
    
    Optional<Tourinfo> findByContentid(Long contentid);
    
    @Query("SELECT T FROM Tourinfo T WHERE T.sigungucode= :sigungucode AND T.areacode= :areacode AND T.contenttypeid=:contenttypeid ")
	List<Tourinfo> queryAnnotationTest1(@Param("sigungucode") int sigungucode, @Param("areacode") int areacode, @Param("contenttypeid") int contenttypeid);
	

    Page<Tourinfo> findByContenttypeid(int type, Pageable pageable);
	Page<Tourinfo> findByAreacodeAndContenttypeid(int areacode, int type, Pageable pageable);
	Page<Tourinfo> findByAreacodeAndSigungucode(int areacode, int sggcode, Pageable pageable);
	Page<Tourinfo> findByAreacode(Integer addr1, Pageable pageable);
	Page<Tourinfo> findByAreacodeAndSigungucode(Integer addr1, Integer addr2, Pageable pageable);
	Page<Tourinfo> findByAreacodeAndSigungucodeAndContenttypeid(int sigungucode, int areacode, int contenttypeid, Pageable pageable);
    
}

package com.TripOrganizer.service;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.dto.PlanlistRequest;
import com.TripOrganizer.persistence.MemberRepository;
import com.TripOrganizer.persistence.PlanlistRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanlistService {

    private final PlanlistRepository planlistRepository;
    private final MemberRepository memReop;
    // 생성: Planlist 저장
    public void createPlan(PlanlistRequest planlistRequest) {
    	
    		Member member = memReop.findById(planlistRequest.getUsername()).orElse(null);
    	    Planlist planlist = new Planlist();
    	    planlist.setPlannerName(planlistRequest.getPlannerName());
    	    planlist.setPeriodS(planlistRequest.getPeriodS());
    	    planlist.setPeriodE(planlistRequest.getPeriodE());
    	    planlist.setUsername(member);
    	    planlistRepository.save(planlist);
    }
    
    public List<Planlist> findByUsername(String username) { // 유저아이디 정보로 플래너 정보 불러오기(멤버 조회)
    	Member member = memReop.findById(username).orElse(null);
    	return planlistRepository.findByUsername(member);
    }

    // 수정: 특정 Planlist 업데이트
    public Planlist updatePlan(Long id, Planlist updatedPlan) {
        return planlistRepository.findById(id).map(plan -> {
            plan.setPeriodE(updatedPlan.getPeriodE());
            plan.setPeriodS(updatedPlan.getPeriodS());
            plan.setPlannerName(updatedPlan.getPlannerName());
            return planlistRepository.save(plan);
        }).orElseThrow(() -> new IllegalArgumentException("Plan not found with id: " + id));
    }

    // 삭제: 특정 Planlist 삭제
    public void deletePlan(Long id) {
        if (planlistRepository.existsById(id)) {
            planlistRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Plan not found with id: " + id);
        }
    }

}

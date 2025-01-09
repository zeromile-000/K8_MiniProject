package com.TripOrganizer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Planlist;
import com.TripOrganizer.domain.dto.PlanlistDTO;
import com.TripOrganizer.domain.dto.PlanlistRequest;
import com.TripOrganizer.persistence.MemberRepository;
import com.TripOrganizer.persistence.PlanlistRepository;

import lombok.RequiredArgsConstructor;

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
    	    planlist.setPackinglist(planlistRequest.getPackinglist());
    	    planlist.setRoute(planlistRequest.getRoute());
    	    planlist.setTodolist(planlistRequest.getTodolist());
    	    planlist.setMember(member);
    	    planlistRepository.save(planlist);
    }
    
    public List<PlanlistDTO> findByUsername(String username) {
        List<Planlist> planlists = planlistRepository.findByMemberUsername(username);

        return planlists.stream().map(planlist -> {
            PlanlistDTO dto = new PlanlistDTO();
            dto.setPlanId(planlist.getPlanId());
            dto.setPlannerName(planlist.getPlannerName());
            dto.setPeriodS(planlist.getPeriodS() != null ? planlist.getPeriodS().toString() : "");
            dto.setPeriodE(planlist.getPeriodE() != null ? planlist.getPeriodE().toString() : "");
            dto.setPackinglist(planlist.getPackinglist() != null ? planlist.getPackinglist().toString() : "");
            dto.setRoute(planlist.getRoute() != null ? planlist.getRoute().toString() : "");
            dto.setTodolist(planlist.getTodolist() != null ? planlist.getTodolist().toString() : "");
            dto.setUsername(planlist.getMember() != null ? planlist.getMember().getUsername() : "");
            return dto;
        }).collect(Collectors.toList());
    }

    // 수정: 특정 Planlist 업데이트
    public Planlist updatePlan(Long id, Planlist planlist) {
        return planlistRepository.findById(id).map(plan -> {
            plan.setPeriodE(planlist.getPeriodE());
            plan.setPeriodS(planlist.getPeriodS());
            plan.setPlannerName(planlist.getPlannerName());
            plan.setPackinglist(planlist.getPackinglist());
            plan.setRoute(planlist.getRoute());
            plan.setTodolist(planlist.getTodolist());
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

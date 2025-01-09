package com.TripOrganizer.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "planlist") // 테이블 이름 명시
public class Planlist {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId; // 플래너 리스트 ID
    
    private String plannerName; // 여행 제목
    
    private LocalDate periodS; // 여행 시작 날짜
    
    private LocalDate periodE; // 여행 종료 날짜
    
    private String packinglist; // 여행 준비물
    
    private String route; // 동선
    
    private String todolist; // 할 일
    
    // Member 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "username", nullable = false) // 외래 키로 설정
    private Member member; // Member 엔티티와 연결된 사용자 정보
    
    @Builder.Default
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "planlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActivityPlan> activityPlans = new ArrayList<>();

}

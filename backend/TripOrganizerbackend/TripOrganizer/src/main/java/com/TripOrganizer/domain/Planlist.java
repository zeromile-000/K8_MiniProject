package com.TripOrganizer.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    
    // Member 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = true) // 외래 키로 설정
    private Member username; // Member 엔티티와 연결된 사용자 정보
    
    
    
    
    
    
    
	

}

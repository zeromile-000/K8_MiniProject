package com.TripOrganizer.domain;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
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
@Table(name = "activity_plan") // 테이블 이름 명시
public class ActivityPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "index_id")
    private Long indexId; // 기본 키 설정 (순번)
    
    @Column(name = "contents")
    private LocalTime contentS; // 여행 시작 시간
    
    @Column(name = "contente")
    private LocalTime contentE; // 여행 종료 시간

    private Long dayIndex; // 여행 일차
    
    @CreationTimestamp // 엔티티가 저장될 때 현재 시간을 자동으로 설정
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt; // 생성일시
    
 // Planlist 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "planId", nullable = false)
    //@JsonBackReference  // Planlist를 직렬화하지 않음
    private Planlist planlist; // Planlist 엔티티와 연결된 콘텐츠 정보
    
    // Tourinfo 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "contentid", nullable = false) // 외래 키로 설정
    //@JsonBackReference 
    private Tourinfo tourinfo; // Tourinfo 엔티티와 연결된 콘텐츠 정보

}

package com.TripOrganizer.domain;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

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
    private Long plannerId; // 기본 키 설정 (순번)

    private String plannerName; // 여행 제목
    
    private LocalDate periodS; // 여행 시작 날짜

    private LocalDate periodE; // 여행 종료 날짜

    private LocalTime contentS; // 여행 시작 시간

    private LocalTime contentE; // 여행 종료 시간

    private Integer dayIndex; // 여행 일차
    
//    private 

    @CreationTimestamp // 엔티티가 저장될 때 현재 시간을 자동으로 설정
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt; // 생성일시

    // Member 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = true) // 외래 키로 설정
    private Member user; // Member 엔티티와 연결된 사용자 정보

    // Tourinfo 엔티티와의 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contentid", nullable = true) // 외래 키로 설정
    private Tourinfo tourInfo; // Tourinfo 엔티티와 연결된 콘텐츠 정보

}
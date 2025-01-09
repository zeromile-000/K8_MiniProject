package com.TripOrganizer.domain.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;

@Data
public class PlanlistRequest {
	private Long planId;
	private String plannerName; // 여행 제목
	private LocalDate periodS; // 시작 날짜
	private LocalDate periodE; // 종료 날짜
	private String username; // 사용자 이름
	private String packinglist; // 여행 준비물
	private String route; // 동선
	private String todolist; // 할 일
}

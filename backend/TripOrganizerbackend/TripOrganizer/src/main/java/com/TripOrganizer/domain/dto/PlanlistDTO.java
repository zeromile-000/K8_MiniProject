package com.TripOrganizer.domain.dto;

import lombok.Data;

@Data
public class PlanlistDTO {
	private Long planId;
	private String plannerName;
	private String periodS;
	private String periodE;
	private String username; // Member의 username만 포함
	private String packinglist; // 여행 준비물
	private String route; // 동선
	private String todolist; // 할 일
}
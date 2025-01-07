package com.TripOrganizer.domain.dto;
import java.time.LocalTime;

import lombok.Data;


@Data
public class ActivityPlanRequest {
	private Long planId; // 플랜 ID
	private Long contentId; // 컨텐츠 ID
    private LocalTime contentS;  // 시작 시간
    private LocalTime contentE;  // 종료 시간
    private Long dayIndex; // 컨텐츠 ID
}

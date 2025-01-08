package com.TripOrganizer.domain.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityPlanDTO {
    @JsonProperty("index_id")
    private Long indexId;

    @JsonProperty("contents")
    private LocalTime contentS;

    @JsonProperty("contente")
    private LocalTime contentE;

    @JsonProperty("day_index")
    private Long dayIndex;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("plan_id")
    private Long planId;

    @JsonProperty("contentid")
    private Long contentid;
    
    private String contentTitle; 
}
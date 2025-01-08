package com.TripOrganizer.domain.dto;




import lombok.Data;

@Data
public class PlanlistDTO {
    private Long planId;
    private String plannerName;
    private String periodS;
    private String periodE;
    private String username; // Member의 username만 포함
}
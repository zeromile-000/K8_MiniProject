package com.TripOrganizer.domain.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestDto {
	private Integer pageNo;
	private Integer addr1;
	private Integer addr2;
	private Integer category;

}

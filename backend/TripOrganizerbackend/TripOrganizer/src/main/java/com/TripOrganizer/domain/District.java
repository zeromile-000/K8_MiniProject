package com.TripOrganizer.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "district")
public class District {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long no;
	private String addr1;
	private Long areacode;
	private String addr2;
	private Long sigungucode;
}

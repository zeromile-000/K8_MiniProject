package com.TripOrganizer.domain;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
@Table(name = "users")
public class Member {
    @Id
    @Column(nullable = false, unique = true, length = 20) // 필수 값, 유니크, 최대 길이 20
    private String username;
    
    @Column(nullable = false) // 필수 값, 최대 길이 255
    private String password;
    
    @Enumerated(EnumType.STRING) // Enum을 문자열로 저장
    private Role role;
    
    private String nickname;
    
    @Column(length = 11, unique = true) // 최대 길이 11, 유니크
    private String phoneNumber;
    
    @Column(unique = true) // 최대 길이 100, 유니크
    private String email;
    
    @Temporal(TemporalType.DATE) // 날짜 타입
    private Date birthDate;
    
    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0") // 기본값 설정
    private Boolean isSocialUser;
    
    private boolean enabled;
	
}

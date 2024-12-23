package com.TripOrganizer;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Role;
import com.TripOrganizer.persistence.MemberRepository;



/// DB연결 Test
@SpringBootTest
public class  DBConnectionTest {
	@Autowired
	MemberRepository memberRepo;
	@Autowired
	PasswordEncoder encoder;
	
	@Test
	public void resist() {
		memberRepo.save(Member.builder()
				.username("zzz56856")
				.password("1234s5")
		        .role(Role.ROLE_MEMBER)
		        .nickname("KIMJUNYEOUNG")
		        .email("zzz568s6@naver.com.com")
		        .build());
	}
}



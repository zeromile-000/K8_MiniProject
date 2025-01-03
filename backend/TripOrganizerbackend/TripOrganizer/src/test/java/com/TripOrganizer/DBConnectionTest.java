package com.TripOrganizer;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Role;
import com.TripOrganizer.domain.Tourinfo;
import com.TripOrganizer.domain.dto.RequestDto;
import com.TripOrganizer.persistence.MemberRepository;
import com.TripOrganizer.persistence.TourinfoRepository;



/// DB연결 Test
@SpringBootTest
public class  DBConnectionTest {
	@Autowired
	MemberRepository memberRepo;
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	TourinfoRepository tourinfoRepository;
	
//	@Test
	public void resist() {
		memberRepo.save(Member.builder()
				.username("zzz56856")
				.password("1234s5")
		        .role(Role.ROLE_MEMBER)
		        .nickname("KIMJUNYEOUNG")
		        .email("zzz568s6@naver.com.com")
		        .build());
	}
	
	@Test
	public void test() {
		Pageable pageable = PageRequest.of(0, 16); 
		 Page<Tourinfo> page = tourinfoRepository.findByAreacodeAndSigungucodeAndContenttypeid(
				2,
				1,
				12,
				pageable);
		 System.out.println("Page" + page);
	}
}



package com.TripOrganizer.hander;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Role;
import com.TripOrganizer.persistence.MemberRepository;
import com.TripOrganizer.util.CustomMyUtil;
import com.TripOrganizer.util.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j // log 객체를 자동으로 생성하여 로깅 기능
@RequiredArgsConstructor // final이나 @NonNull 필드에 대해 자동으로 생성자를 만들어주는 어노테이션
@Component // Spring의 컴포넌트 스캔 대상 // Bean 객체
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler { // Spring Security의 기본 인증 성공 핸들러로, OAuth2 인증이 성공한 후 추가적인 처리를 위해 확장
	 private final MemberRepository memRepo; // 사용자 정보를 데이터베이스에 저장하기 위해 사용
	 private final PasswordEncoder encoder; // 비밀번호를 암호화하기 위한 객체, 비밀번호 인코딩 기능을 사용
	 
	 @Override
	 public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
	 Authentication authentication) throws IOException, ServletException { //  인증된 사용자 정보를 기반으로 새로운 계정을 생성하고 JWT 토큰을 발급
		 log.info("OAuth2SuccessHandler:onAuthenticationSuccess");
		 OAuth2User user = (OAuth2User)authentication.getPrincipal(); // 객체에서 인증된 OAuth2 사용자의 정보를 가져오는 객체
	
		 // 임의의 사용자를 만들어서 서버에 저장
		 String username = CustomMyUtil.getUsernameFromOAuth2User(user); // OAuth2 사용자 정보를 기반으로 사용자 이름을 생성
		 if (username == null) { // 사용자 이름이 없을시 예외 발생
		 log.error("onAuthenticationSuccess:Cannot generate username from oauth2user!");
		 throw new ServletException("Cannot generate username from oauth2user!");
		 }
		 
		 log.info("onAuthenticationSuccess:" + username);
		 memRepo.save(Member.builder() // Member 객체를 생성하여 사용자 정보를 저장
		 .username(username) 
		 .password(encoder.encode("1a2s3d4f"))
		 .role(Role.ROLE_MEMBER) //사용자는 기본적으로 ROLE_MEMBER 권한을 부여
		 .enabled(true) // enabled=true) 상태로 저장
		 .build()); 
	 
	 String jwtToken = JWTUtil.getJWT(username); // 사용자 이름을 기반으로 JWT 토큰을 생성
	 response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken); // 생성된 JWT 토큰을 HTTP 응답 헤더의 Authorization 필드에 추가
	 
	}
}
package com.TripOrganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.service.MemberRegistrationService;

import lombok.RequiredArgsConstructor;

@RestController // 모든 메서드가 JSON 또는 HTTP 응답으로 반환
@RequiredArgsConstructor // final로 선언된 멤버 변수의 생성자를 자동으로 생성
public class LoginController {
	
	@Autowired
    private final MemberRegistrationService memberRegistrationService;
    
    @PostMapping("/signup")
	public Member registerMember(@RequestBody Member member){
		return memberRegistrationService.registerMember(member);
	}
    
    @GetMapping("/signup/check")
    public boolean checkUsername(@RequestParam String username) {
        return memberRegistrationService.checkUsernameExists(username); // 중복 여부 반환
    }
    

    @GetMapping("/auth")
    public @ResponseBody ResponseEntity<?> auth(@AuthenticationPrincipal User user) { // 현재 인증된 사용자의 정보를 가져옴.
        if (user == null) {
            return ResponseEntity.ok("로그인 상태가 아닙니다."); // 인증된 사용자가 없으면 "로그인 상태가 아닙니다." 반환
        }
        return ResponseEntity.ok(user); // 인증된 사용자가 있으면 사용자 정보를 JSON 형식으로 반환
    }

    @GetMapping("/oauth2")
    public @ResponseBody String auth(@AuthenticationPrincipal OAuth2User user) { // OAuth2 인증 사용자의 정보를 가져옴
        if (user == null)
            return "OAuth2:null"; // OAuth2 인증 사용자가 없으면 "OAuth2:null" 반환

        // 자동 회원가입을 한다면 이용할 정보 확인
        System.out.println("attributes:" + user.getAttributes());
        return "OAuth2:" + user;
    }

   
}

package com.TripOrganizer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TripOrganizer.domain.LoginRequest;
import com.TripOrganizer.domain.SignupRequest;
import com.TripOrganizer.service.MemberRegistrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final MemberRegistrationService memberRegistrationService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        memberRegistrationService.registerUser(
            signupRequest.getUsername(),
            signupRequest.getPassword(),
            signupRequest.getEmail(),
            signupRequest.getNickname()
        );
        return ResponseEntity.ok("회원가입에 성공하셨습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Login authentication logic can be implemented here.
        return ResponseEntity.ok("로그인에 성공하셨씁니다.");
    }
}
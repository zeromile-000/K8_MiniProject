package com.TripOrganizer.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.domain.Role;
import com.TripOrganizer.persistence.*;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MemberRegistrationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(String username, String password, String email, String nickname) {
        Member member = Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password)) // 비밀번호 암호화
                .email(email)
                .nickname(nickname)
                .role(Role.ROLE_MEMBER) // 기본적으로 ROLE_MEMBER 할당
                .isSocialUser(false)
                .build();

        memberRepository.save(member);
    }
}
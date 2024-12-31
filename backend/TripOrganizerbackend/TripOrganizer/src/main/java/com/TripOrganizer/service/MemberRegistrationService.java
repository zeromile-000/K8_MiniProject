package com.TripOrganizer.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TripOrganizer.domain.Member;
import com.TripOrganizer.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MemberRegistrationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member registerMember(Member member) {
		member.setPassword(passwordEncoder.encode(member.getPassword()));
	    return memberRepository.save(member);
	}
    public boolean checkUsernameExists(String username) {
        return memberRepository.existsByUsername(username); // 중복 여부 반환
    }
    
}
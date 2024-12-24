package com.TripOrganizer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	
		
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 경로에 대한 cors 설정 적용
				.allowedOriginPatterns("*") // 모든 도메인에서의 요청 허용
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 모든 HTTP 메소드 허용
				.allowedHeaders("*") // 모든 헤더를 허용
				.allowCredentials(true) // 쿠키와 같은 자격증명을 포함한 요청 허용
				.exposedHeaders("Authorization"); // 클라이언트가 접근할 수 있는 응답 헤더
		
	}
//	@Override
//	public void addCorsMappings(@NonNull CorsRegistry registry) {
//	    registry.addMapping("/**")
//	            .allowCredentials(true) // 클라이언트가 쿠키/인증 헤더 포함 가능
//	            .allowedHeaders(
//	                    HttpHeaders.AUTHORIZATION, // 인증 헤더
//	                    HttpHeaders.CONTENT_TYPE,  // 콘텐츠 타입 헤더
//	                    HttpHeaders.ACCEPT         // 응답 타입 허용
//	            )
//	            .exposedHeaders(
//	                    HttpHeaders.AUTHORIZATION, // 클라이언트에서 볼 수 있는 헤더
//	                    HttpHeaders.CONTENT_TYPE
//	            )
//	            .allowedMethods(
//	                    HttpMethod.GET.name(),
//	                    HttpMethod.POST.name(),
//	                    HttpMethod.PUT.name(),
//	                    HttpMethod.DELETE.name()
//	            )
//	            .allowedOrigins(
//	                    "http://localhost:3000",   // React 개발 서버
//	                    "http://10.125.121.205:3000"   // IPv4 형식
//	            );
//	}


}

package com.TripOrganizer.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTUtil {
	private static final long ACCESS_TOKEN_MSEC = 100 * (60 * 1000); // JWT 토큰의 유효시간(만료시간)을 밀리초 단위로 정의
	private static final String JWT_KEY = "com.TripOrganizer.jwtkey"; // JWT 서명에 사용하는 비밀 키로, 토큰을 생성하고 검증할 때 사용
	private static final String claimName = "username"; // username을 클레임으로 사용하여 토큰에서 사용자 이름을 저장 및 검색
	private static final String prefix = "Bearer";

	private static String getJWTSource(String token) { // 입력받은 토큰 문자열이 Bearer 접두어로 시작하면 이를 제거한 순수한 JWT 토큰을 반환
		if (token.startsWith(prefix))
			return token.replace(prefix, "");
		return token;
	}

	public static String getJWT(String username) {
		String src = JWT.create().withClaim(claimName, username) // 입력받은 사용자 이름(username)을 클레임에 저장한 JWT를 생성
				.withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_MSEC))
				.sign(Algorithm.HMAC256(JWT_KEY));
		return prefix + src;
	}

	public static String getClaim(String token) {
		String tok = getJWTSource(token); // 주어진 JWT에서 클레임(claimName, 즉 username) 값을 추출
		return JWT.require(Algorithm.HMAC256(JWT_KEY)).
				build()
				.verify(tok)
				.getClaim(claimName)
				.asString();
	}

	public static boolean isExpired(String token) {
		String tok = getJWTSource(token); // 주어진 JWT의 만료 여부를 확인.
		return JWT.require(Algorithm.HMAC256(JWT_KEY))
				.build()
				.verify(tok)
				.getExpiresAt()
				.before(new Date());
	}

}
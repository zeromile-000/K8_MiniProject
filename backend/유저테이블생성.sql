-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,       -- 고유 사용자 ID
--     username VARCHAR(20) NOT NULL UNIQUE,         -- 아이디 (6~20자)
--     password VARCHAR(255) NOT NULL,               -- 비밀번호 (암호화된 값 저장)
--     nickname VARCHAR(50) NOT NULL,                -- 닉네임
--     phone_number VARCHAR(11) UNIQUE,              -- 전화번호 (최대 11자리)
--     email VARCHAR(100) UNIQUE,                    -- 이메일 주소
--     birth_date DATE                                -- 생년월일
-- );
-- ALTER TABLE users
-- ADD COLUMN is_social_user BOOLEAN DEFAULT FALSE; -- 소셜 로그인 사용자 여부
ALTER TABLE users
ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user';


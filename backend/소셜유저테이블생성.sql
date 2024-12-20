CREATE TABLE social_users (
    social_id INT AUTO_INCREMENT PRIMARY KEY,   -- 고유 소셜 사용자 ID
    user_id INT,                                -- 내부 사용자 테이블과 연결
    provider VARCHAR(50) NOT NULL,              -- OAuth 제공자 (Google, Facebook 등)
    provider_id VARCHAR(255) NOT NULL UNIQUE,   -- 제공자의 사용자 ID (고유)
    email VARCHAR(100),                         -- 소셜 이메일 (선택 사항)
    name VARCHAR(100),                          -- 사용자 이름
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE -- 내부 사용자와 연동
);

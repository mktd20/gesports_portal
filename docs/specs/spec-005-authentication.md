# Spec-005: 로그인 기능

## 개요
사용자 인증 및 세션 관리 시스템

## 기능 요구사항

### 5.1 회원가입
- 이메일 기반 회원가입
- 비밀번호 설정 (최소 길이, 복잡도 요구사항)
- 닉네임 설정
- 이메일 인증 (optional)
- 약관 동의

### 5.2 로그인
- 이메일/닉네임 + 비밀번호 로그인
- 세션 관리 (JWT 또는 세션 쿠키)
- 자동 로그인 (Remember me) 기능

### 5.3 로그아웃
- 세션 종료
- 모든 기기에서 로그아웃 (optional)

### 5.4 비밀번호 관리
- 비밀번호 찾기 (이메일 인증)
- 비밀번호 변경
- 비밀번호 재설정

### 5.5 프로필 관리
- 닉네임 변경
- 프로필 이미지 업로드
- 자기소개
- 선호 게임 설정

### 5.6 권한 관리
- 일반 사용자
- 관리자
- 게임별 모더레이터 (optional)

## 보안 요구사항
- 비밀번호 해싱 (bcrypt 등)
- CSRF 보호
- XSS 방지
- Rate limiting (로그인 시도 제한)
- 2FA (optional)

## 데이터베이스 설계
- `users` 테이블
  - id (PK)
  - email (unique)
  - password_hash
  - nickname (unique)
  - profile_image_url
  - bio
  - role (user, admin, moderator)
  - email_verified
  - created_at
  - updated_at
  - last_login_at

- `user_sessions` 테이블
  - id (PK)
  - user_id (FK)
  - session_token
  - expires_at
  - created_at

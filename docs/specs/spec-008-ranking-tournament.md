# Spec-008: 랭킹전 대회 운영 시스템

## 개요
랭킹전 대회를 개최하고 사용자들이 참가할 수 있는 시스템

## 기능 요구사항

### 8.1 대회 개최
- **개최자**: 관리자 또는 특정 권한을 가진 사용자
- 대회 정보 입력:
  - 대회명
  - 게임 카테고리
  - 대회 일정 (시작일시, 종료일시)
  - 참가 신청 기간
  - 참가 인원 제한
  - 참가 자격 (최소 랭킹, 최대 랭킹 등)
  - 상금/상품 정보 (optional)
  - 대회 규칙 및 설명
  - 자동 스케줄링 설정 (정기 대회인 경우)
  - 자동 스트리밍/녹화 설정

### 8.2 참가 신청
- 로그인한 사용자만 참가 가능
- 참가 자격 확인 (랭킹 범위 등)
- 참가 인원 제한 확인
- 참가 신청 취소 (신청 기간 내)

### 8.3 대회 진행
- 참가자 목록 확인
- 대진표 생성 (자동 또는 수동)
- **자동 경기 생성**: 대진표 생성 시 경기 슬롯 자동 생성
- **자동 스트리밍**: 경기 시작 시 YouTube 라이브 자동 생성 및 OBS 송출
- 경기 결과 입력
- 토너먼트 진행 상황 표시
- 실시간 업데이트
- 리플레이 자동 수집 (LoL/VALORANT)

### 8.4 대회 결과
- 최종 순위 발표
- 랭킹 포인트 지급
- 상금/상품 지급 (optional)
- 대회 결과 기록 저장

### 8.5 대회 관리
- 대회 상태 관리 (신청 접수 중, 진행 중, 종료)
- 참가자 관리 (참가 승인/거부)
- 대회 수정/취소

## 데이터베이스 설계
- `ranking_tournaments` 테이블
  - id (PK)
  - tournament_name
  - game_category
  - organizer_id (FK)
  - start_date
  - end_date
  - registration_start
  - registration_end
  - max_participants
  - min_rank (optional)
  - max_rank (optional)
  - prize_info
  - rules_description
  - status (open, in_progress, completed, cancelled)
  - created_at
  - updated_at

- `tournament_registrations` 테이블
  - id (PK)
  - tournament_id (FK)
  - user_id (FK)
  - registration_status (pending, approved, rejected)
  - registered_at

- `tournament_brackets` 테이블
  - id (PK)
  - tournament_id (FK)
  - round_number
  - match_number
  - player1_id (FK)
  - player2_id (FK)
  - winner_id (FK)
  - match_date
  - status (pending, completed)

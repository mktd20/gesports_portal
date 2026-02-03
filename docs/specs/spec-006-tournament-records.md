# Spec-006: 게임별 온라인 대회 기록 관리

## 개요
게임별 온라인 대회의 승/패 기록을 관리하고, 이를 랭킹 시스템에 반영하는 기능

## 기능 요구사항

### 6.1 대회 기록 등록
- 대회명
- 게임 카테고리
- 대회 일시
- 참가자/팀 정보
- 승/패 결과
- 상세 스코어 (optional)
- 대회 링크/영상 (optional)
- 리플레이 파일 경로 (LoL/VALORANT)
- YouTube VOD 링크

### 6.2 기록 조회
- 게임별 필터링
- 날짜별 필터링
- 참가자/팀별 검색
- 최신순 정렬

### 6.3 기록 수정/삭제
- 관리자만 수정/삭제 가능
- 기록 수정 시 랭킹 재계산 필요

### 6.4 랭킹 연동
- 대회 기록이 랭킹 시스템에 자동 반영
- 승리 시 포인트 획득
- 패배 시 포인트 감소 (optional)
- 대회 중요도에 따른 가중치 적용 (optional)

## 데이터베이스 설계
- `tournaments` 테이블
  - id (PK)
  - game_category
  - tournament_name
  - tournament_date
  - tournament_link
  - created_at
  - updated_at

- `tournament_participants` 테이블
  - id (PK)
  - tournament_id (FK)
  - user_id 또는 team_id (FK)
  - rank (1등, 2등 등)
  - points_earned
  - created_at

- `tournament_matches` 테이블
  - id (PK)
  - tournament_id (FK)
  - player1_id 또는 team1_id (FK)
  - player2_id 또는 team2_id (FK)
  - winner_id
  - score (optional)
  - match_date
  - youtube_vod_url
  - replay_file_path
  - created_at

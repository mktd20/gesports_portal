# Spec-008: 아마추어 랭킹 시스템

## 개요
게임별 아마추어 플레이어들의 랭킹을 관리하고 표시하는 시스템

## 기능 요구사항

### 7.1 랭킹 계산
- 대회 기록 기반 포인트 시스템
- 승리 시 포인트 획득
- 패배 시 포인트 감소 (optional)
- 대회 중요도에 따른 가중치 적용
- 시간에 따른 포인트 감소 (decay, optional)

### 7.2 랭킹 표시
- 게임별 랭킹
- 전체 랭킹
- 상위 N명 표시 (예: Top 100)
- 사용자 본인 랭킹 위치 표시

### 7.3 랭킹 정보
- 사용자 닉네임
- 현재 포인트
- 랭킹 순위
- 승/패 기록
- 최근 대회 참가 이력
- 랭킹 변화 (상승/하락)

### 7.4 랭킹 업데이트
- 대회 기록 등록 시 자동 업데이트
- 실시간 또는 배치 처리
- 랭킹 히스토리 관리 (optional)

## 랭킹 알고리즘
- 기본 포인트 시스템
- Elo 레이팅 시스템 (optional)
- Glicko 레이팅 시스템 (optional)

## 데이터베이스 설계
- `rankings` 테이블
  - id (PK)
  - user_id (FK)
  - game_category
  - points
  - rank
  - wins
  - losses
  - win_rate
  - updated_at

- `ranking_history` 테이블 (optional)
  - id (PK)
  - user_id (FK)
  - game_category
  - points
  - rank
  - recorded_at

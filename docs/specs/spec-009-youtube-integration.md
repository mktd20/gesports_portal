# Spec-009: 유튜브 영상 연동

## 개요
eSports 관련 유튜브 영상을 포털에 연동하여 제공하는 기능. 경기 라이브 스트리밍 및 자동 VOD 업로드 포함.

## 기능 요구사항

### 9.1 영상 수집
- **데이터 소스**: YouTube Data API
- **수집 방식**:
  - 특정 채널 구독
  - 키워드 기반 검색
  - 플레이리스트 연동
  - **경기 라이브 스트리밍 자동 생성** (YouTube Live API)
  - **경기 VOD 자동 업로드**
- **수집 주기**: TBD (예: 1시간마다 또는 실시간)

### 9.1.1 라이브 스트리밍 자동화
- **경기 생성 시**: YouTube Live API로 예약 방송 자동 생성
- **방송 설정**:
  - 제목: "{경기명} - {게임} 경기"
  - 설명: 경기 정보 자동 입력
  - 자동 녹화: `recordFromStart` 활성화
  - 태그: 게임명, 대회명 등
- **스트림키 관리**: 경기별 고유 스트림키 매핑
- **OBS 연동**: 스트림키로 자동 송출 시작

### 9.1.2 VOD 자동 업로드
- **라이브 종료 시**: 자동으로 VOD 생성
- **리플레이 기반 업로드**: 라이브 실패 시 리플레이로 VOD 재생성 후 업로드
- **메타데이터 자동 설정**: 제목, 설명, 태그, 썸네일
- **경기 페이지 연동**: 업로드 완료 시 경기 페이지에 자동 링크 연결

### 9.2 영상 표시
- 최신순 정렬
- 게임별 필터링
- 채널별 필터링
- 인기순 정렬 (조회수 기반)
- 검색 기능

### 9.3 영상 정보
- 제목
- 채널명
- 업로드 일시
- 조회수
- 좋아요 수
- 썸네일 이미지
- 영상 링크
- 영상 설명 (요약)
- 게임 카테고리 태그

### 9.4 영상 재생
- 유튜브 임베드 플레이어
- 인라인 재생 또는 새 탭 열기
- 재생 목록 생성 (optional)

### 9.5 관리 기능
- 관리자가 수동으로 영상 추가/삭제 가능
- 자동 수집 영상 관리
- 중복 영상 방지

## API 연동
- YouTube Data API v3 사용
- API 키 관리
- 할당량 관리 (Quota)
- 에러 핸들링

## 데이터베이스 설계
- `youtube_channels` 테이블
  - id (PK)
  - channel_id (YouTube 채널 ID)
  - channel_name
  - description
  - is_active
  - created_at

- `youtube_videos` 테이블
  - id (PK)
  - video_id (YouTube 비디오 ID, unique)
  - channel_id (FK)
  - match_id (FK, optional) - 경기 연동
  - video_type (uploaded, live_stream, vod)
  - title
  - description
  - thumbnail_url
  - published_at
  - view_count
  - like_count
  - game_category
  - video_url
  - stream_key (라이브 스트리밍용)
  - live_status (scheduled, live, ended)
  - created_at
  - updated_at

- `youtube_live_streams` 테이블
  - id (PK)
  - match_id (FK)
  - stream_key
  - broadcast_id
  - status (scheduled, live, ended)
  - scheduled_start_time
  - actual_start_time
  - actual_end_time
  - vod_video_id (라이브 종료 후 생성된 VOD)
  - created_at
  - updated_at

- `video_tags` 테이블 (optional)
  - id (PK)
  - video_id (FK)
  - tag_name

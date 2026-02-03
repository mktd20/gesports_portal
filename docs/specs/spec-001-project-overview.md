# Spec-001: 프로젝트 개요

## 프로젝트명
eSports Portal (게임 이스포츠 포털)

## 프로젝트 목적
게임 이스포츠 커뮤니티를 위한 통합 포털 서비스 개발

## 주요 기능
1. eSports 최신 뉴스 기사 제공
2. 게임별 자유 게시판
3. 실시간 인기글 게시판 (트렌딩)
4. 사용자 인증 시스템
5. 게임별 온라인 대회 기록 관리
6. 아마추어 랭킹 시스템
7. 랭킹전 대회 운영 시스템
8. 유튜브 관련 영상 연동
9. **자동 경기 운영 시스템** (경기 스케줄링, 자동 스트리밍/녹화, 리플레이 관리)

## 기술 스택
- **Frontend**: Svelte 5 (SvelteKit)
- **Backend**: SvelteKit 서버 (API Routes)
- **Database**: SQLite
  - SQLite는 파일 기반 데이터베이스로 개발 및 소규모 운영에 적합
  - 필요 시 PostgreSQL 등으로 마이그레이션 가능하도록 설계
- **개발 도구**: MCP (Model Context Protocol)
  - Svelte MCP를 통한 개발 지원
- **External APIs**: 
  - 뉴스 API
  - YouTube Data API v3
  - YouTube Live Streaming API
- **스트리밍/녹화**: OBS Studio (OBS WebSocket API)
- **스케줄러**: 크론 작업 또는 이벤트 기반 처리
- **게임 지원**: LoL (리그 오브 레전드), VALORANT (발로란트)

## 개발 단계
- 1차 초안: 기본 기능 명세 및 구조 설계
- **개발 순서**: [Spec-000: 개발 Phase별 구현 순서](./spec-000-development-phases.md) 참고

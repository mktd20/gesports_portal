# Spec-002: eSports 뉴스 기사 기능

## 개요
eSports 관련 최신 뉴스 기사를 외부 API를 통해 수집하여 제공하는 기능

## 기능 요구사항

### 2.1 데이터 수집
- **데이터 소스**: 외부 API
- **수집 주기**: TBD (예: 1시간마다 또는 실시간)
- **수집 데이터 항목**:
  - 제목 (title)
  - 요약 (summary)
  - 링크 (link)
  - 게시일시 (published_at)
  - 썸네일 이미지 (thumbnail, optional)
  - 출처 (source, optional)

### 2.2 데이터 표시
- 최신순 정렬
- 페이지네이션 지원
- 게임별 필터링 (optional)
- 검색 기능 (optional)

### 2.3 제약사항
- **입력 기능 없음**: 관리자나 사용자가 직접 뉴스를 입력할 수 없음
- 모든 데이터는 외부 API를 통해서만 수집

## API 연동
- 외부 뉴스 API 연동 필요
- API 키 관리
- 에러 핸들링 및 재시도 로직

## 데이터베이스 설계
- `news_articles` 테이블
  - id (PK)
  - title
  - summary
  - link (unique)
  - published_at
  - thumbnail_url
  - source
  - created_at
  - updated_at

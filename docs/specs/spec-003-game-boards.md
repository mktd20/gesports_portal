# Spec-003: 게임별 게시판

## 개요
사용자들이 자유롭게 글을 작성할 수 있는 게임별 게시판 기능

## 기능 요구사항

### 3.1 게시판 구조
- 게임별로 독립적인 게시판 운영
- 게임 카테고리 예시:
  - 리그 오브 레전드 (LoL)
  - 배틀그라운드 (PUBG)
  - 발로란트 (Valorant)
  - 오버워치 (Overwatch)
  - 기타 eSports 게임

### 3.2 게시글 기능
- **작성**: 로그인한 사용자만 작성 가능
- **조회**: 비회원도 조회 가능 (optional)
- **수정**: 작성자 본인만 수정 가능
- **삭제**: 작성자 본인 또는 관리자만 삭제 가능
- **댓글**: 댓글 작성, 수정, 삭제 기능

### 3.3 게시글 항목
- 제목 (title)
- 내용 (content)
- 작성자 (author)
- 작성일시 (created_at)
- 수정일시 (updated_at)
- 조회수 (view_count)
- 좋아요/추천 수 (like_count)
- 게임 카테고리 (game_category)
- 첨부파일 (attachments, optional)

### 3.4 정렬 및 필터링
- 최신순
- 조회수순
- 추천순
- 댓글수순

## 데이터베이스 설계
- `game_boards` 테이블
  - id (PK)
  - game_name (게임명)
  - description
  - created_at

- `posts` 테이블
  - id (PK)
  - game_board_id (FK)
  - user_id (FK)
  - title
  - content
  - view_count
  - like_count
  - created_at
  - updated_at

- `comments` 테이블
  - id (PK)
  - post_id (FK)
  - user_id (FK)
  - content
  - created_at
  - updated_at

- `post_likes` 테이블
  - id (PK)
  - post_id (FK)
  - user_id (FK)
  - created_at

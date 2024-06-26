# Sun-coffee

카페 메뉴를 기준으로 판매와 주문 및 결제 연동 커머스 프로젝트 입니다.

<img width="800" alt="image" src="https://github.com/suneunkim/Sun-coffee/assets/98196225/63344cca-8bcd-4167-87e1-712198bcfa43">

## 프로젝트 기간

- 2024.04 ~ 2024.05
- 주차별 기능 구현을 목표로 개발

| 1주차                    | 2주차                   | 3주차                      | 4주차         |
| ------------------------ | ----------------------- | -------------------------- | ------------- |
| 파이어 베이스 구축       | 상품 CRUD               | 상품 구매 기능             | 렌더링 최적화 |
| 와이어프레임, 유저플로우 | 장바구니 CRUD           | 결제 SDK 연동              | SEO 최적화    |
| 로그인 / 회원가입        | 인터랙티브 UI 요소 추가 | 구매내역 페이지 개발       | 번들 최적화   |
| 지연 로딩 적용하기       | 이미지 최적화           | 판매자 주문 상태 변경 기능 |               |

## 사용 기술

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1716015445266?alt=media&token=e9fbc9cc-15e0-4634-8d5b-ad1803483336)](https://github.com/msdio/stackticon)

## 주요 기능

**회원가입과 로그인**

- 폼 유효성 검증
- firebase의 메서드를 활용하여 로그인 상태 변화 추적

**[구매자] 장바구니와 주문하기**

- 선택한 상품 주문 → 포트원 SDK로 결제 구현
- 주문 취소 기능

**[판매자] 판매 상품 관리하기**

- 판매 상품 CRUD
- 주문 상태 수정 기능(주문 취소, 제조 대기, 제조 완료)

**관련 API 기능**

- 리액트 쿼리와 파이어베이스의 데이터 페치를 이용한 무한 스크롤 구현
- 카테고리별 상품 조회
- 상품 상세보기 시 하단에 비슷한 상품 추천 기능 추가
- 주문 내역 조회 및 상태 업데이트

링크 예시 [Babel](https://babeljs.io/) for Fast Refresh

## [트러블 슈팅](https://www.notion.so/1b9e4e40e75c42ea859012764adcb7b7?pvs=4#e39b8d9d2b164464a3b93e138335eca7)

1. 판매자 여부에 따른 홈 라우팅 처리과 리다이렉션 관리하기
2. 등록된 상품의 이미지 url이 firestorage를 통해 업로드 된 경우가 아닐 때 상품 수정 시 로직 충돌 에러
3. 무한스크롤 적용 시 데이터 로드 문제
4. 상품 결제 완료 후 처리 로직 개선

## [기술적 의사 결정](https://www.notion.so/1b9e4e40e75c42ea859012764adcb7b7?pvs=4#6ab7ef4cf4cb472abb902dda4d4b5a71)

- Context API 선택
- 주문과 결제 데이터 구조 고민하기

## [성능 개선](https://www.notion.so/1b9e4e40e75c42ea859012764adcb7b7?pvs=4#8adbe65bc66a4f7fa9d1f25a846f57cb)

1. 리렌더링 최적화

- `React.memo` 적용하기. (Nav 컴포넌트와 ProductList 컴포넌트)

2. 이미지 최적화

- 상품 등록 시 이미지 파일을 WebP로 변환하기. 이미지파일 1.1MB -> 626KB 감소 효과

3. 번들 크기 최적화

- vite 설정 -> 파일 압축 설정
- vite 설정 -> 텍스트 기반 리소스 압축
- 동적 임포트 적용으로 코드 스플리팅. (모달창, 앱 라우트 적용)

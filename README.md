<img src="https://www.bworldonline.com/wp-content/uploads/2022/01/airbnb.jpg" width="100%" alt="airBnb Clone">

<br>

# Airbnb Clone Project

## 배포 URL

**<https://clone-example-three.vercel.app/>**

## 프로젝트 설명

Airbnb 클론 프로젝트는 Next.js, Tailwind, Prisma, MongoDB 스택을 사용하여 제작된 풀스택 웹 어플리케이션입니다. 세계적으로 많이 찾는 Airbnb의 디자인과 기능이 마음에 들어 제 방식으로 재구성 해보았습니다.

## 특징 및 구현 목록

-   Tailwind로 디자인
-   NextAuth를 통한 구글, Github, Naver 소셜 로그인 및 일반 로그인
-   react-hook-form을 사용한 클라이언트 양식 유효성 검사 및 처리
-   react-toast를 이용한 성공, 실패 메세지 처리
-   react-date-range와 date-fns를 이용해 캘린더 UI 및 결제 로직 구현
-   카카오 결제 api 연결
-   게스트 예약 취소 및 카카오 환불 처리 구현
-   에어비앤비 등록자 예약 취소 및 카카오 환불 처리 구현
-   페이지 로딩시 로딩 스피너 구현 및 에러 컴포넌트 구현
-   에어비앤비 등록 로직 구현
-   카테고리, 날짜 범위, 지도 위치, 손님 수, 객실 및 욕실별 필터 기능 구현 (쿼리 스트링을 통해 필터 하여 필터 결과 URL 공유 가능)
-   즐겨찾기 기능 구현
-   반응형

## 기술 스택

-   React[`Next.js`]
-   MongoDB
-   Tailwind
-   Prisma

## Installation

### 실행 버전

node 버전 14 이상

### 저장소 복제

```shell
git clone https://github.com/newExpand/airbnb-clone-project.git
```

### 패키지 설치

```shell
npm i
```

### 프리즈마 설정

```shell
npx prisma db push
```

### .env 파일 설정

```shell
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
IMP_KEY=
IMP_SECRET=
```

### 앱 시작

```shell
npm run dev
```

## 사용 가능한 명령어

`npm run [command]` 으로 명령 실행

| command | 설명                             |
| :------ | :------------------------------- |
| `dev`   | 앱의 개발 인스턴스를 시작합니다. |

## 스크린 샷

## 도전과제 및 해결책

## Deployment

-   Vercel 사용

## Roadmap

-   v1.0.0: 기본적인 기능 구현 (진행중)

## Contact

-   이메일: tmskqj@gmail.com
-   블로그: https://opendeveloper.tistory.com/

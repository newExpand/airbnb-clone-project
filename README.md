<img src="https://www.bworldonline.com/wp-content/uploads/2022/01/airbnb.jpg" width="100%" alt="airBnb Clone">

<br>

# Airbnb Clone Project

## 배포 URL

**<https://clone-example-three.vercel.app/>**

<br>

## lighthouse

**23/05/19 라이트하우스 결과**

![lighthouse 결과](https://user-images.githubusercontent.com/120312998/239345542-24860208-5ad6-4334-bb39-ad0d5a912c2f.png)

<br>

**23/05/21 라이트하우스 결과**

![lighthouse 결과](https://user-images.githubusercontent.com/120312998/239730527-ce52fee0-8aa1-44ac-ad54-25deb09993e7.png)

<br>

## 프로젝트 설명

Airbnb 클론 프로젝트는 Next.js 13 experimental 버전에 Tailwind, Prisma, MongoDB 스택을 사용하여 제작된 풀스택 웹 어플리케이션입니다. 세계적으로 많이 찾는 Airbnb의 디자인과 기능이 마음에 들어 제 방식으로 재구성 해보았습니다.

**이 프로젝트로 얻고 싶은 것**<br>
프론트엔드를 준비하고 있지만 백엔드의 로직을 좀 더 느끼기 위해 풀스택을 개발을 해봄으로써 전체적인 그림을 경험해 보기 위해 시작하게 되었습니다.

<br>

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

<br>

## 기술 스택

-   React[`Next.js`]
-   MongoDB
-   Tailwind
-   Prisma

<br>

## 상태관리

-   Zustand

<br>

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

<br>

## 사용 가능한 명령어

`npm run [command]` 으로 명령 실행

| command | 설명                             |
| :------ | :------------------------------- |
| `dev`   | 앱의 개발 인스턴스를 시작합니다. |

<br>

## 스크린 샷 및 GIF

**소셜 로그인(깃허브)**

![소셜 로그인(깃허브)](https://user-images.githubusercontent.com/120312998/239246309-329fd639-f802-4a3c-8c81-c676ecca011c.gif)

**일반 로그인**

![일반 로그인](https://user-images.githubusercontent.com/120312998/239246710-0cbe51f0-a597-4e1e-a484-d599213eca10.gif)

**에어비앤비 등록**

![에어비앤비 등록](https://user-images.githubusercontent.com/120312998/239246502-4f06287d-1a65-4af8-aff6-7873692f4f37.gif)

**에어비앤비 등록해제**

![에어비앤비 등록해제](https://user-images.githubusercontent.com/120312998/239252434-8eb53d31-1dbd-4770-891f-23855872dc19.gif)

**필터기능**

![필터기능](https://user-images.githubusercontent.com/120312998/239246674-2ea1c8bf-2e07-4d40-9e91-271bfc4a998c.gif)

**결제완료 및 환불**

![결제완료 및 환불](https://user-images.githubusercontent.com/120312998/239246804-4023551b-e0ce-4eb9-b32d-609c5233355a.gif)

**결제 및 환불 카톡알림**

![결제 카톡알림](https://github.com/newExpand/airbnb-clone-project/assets/120312998/961943e0-1f25-4b14-90d6-c7c3a3d0db88) ![카톡 결제취소](https://github.com/newExpand/airbnb-clone-project/assets/120312998/8751b486-b5f1-4305-b9e3-c38ef8a5ced2)

**모바일 반응형**

<img style="border: 1px solid #eee; border-radius: 16px" src="https://github.com/newExpand/airbnb-clone-project/assets/120312998/5b56d556-8ca3-466f-9820-6bffa369da49" width="320px" alt="모바일반응형사진">

<br>

## 도전과제

풀스택 구현 - 전체적인 페이지 기능이 원활히 돌아가게 A-Z까지 혼자 구현해보기(완료)

lighthouse performance 점수 개선하기 - 웹페이지에 이미지가 많은 특성으로 인해 performance가 낮게 나옴을 확인 개선 필요(완료)

이미지 등록을 cloudinary를 사용하고 있으나 사용하지 않고 자체개발로 구현해보기(도전중)

<br>

## 만들며 작성한 블로그 글

[Prisma 사용/공부 요약](https://opendeveloper.tistory.com/entry/Prisma-%EC%82%AC%EC%9A%A9%EA%B3%B5%EB%B6%80-%ED%9B%84%EA%B8%B0)

[useCallback 사용법 정리](https://opendeveloper.tistory.com/entry/React-useCallback-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%A0%95%EB%A6%AC)

[Next.js에서 Next-Auth의 AuthOptions구성 할 때, Callbacks 옵션에 타입주기](https://opendeveloper.tistory.com/entry/Nextjs%EC%97%90%EC%84%9C-Next-Auth%EC%9D%98-AuthOptions%EA%B5%AC%EC%84%B1-%ED%95%A0-%EB%95%8C-Callbacks-%EC%98%B5%EC%85%98%EC%97%90-%ED%83%80%EC%9E%85%EC%A3%BC%EA%B8%B0)

[[ERROR] Vercel 배포시 Prisma 에러 - 해결](https://opendeveloper.tistory.com/entry/Error-Vercel-%EB%B0%B0%ED%8F%AC%EC%8B%9C-Prisma-%EC%97%90%EB%9F%AC-%ED%9A%8C%EA%B3%A0)

[[ERROR] 구글 Oauth 카카오톡 인앱 에러(※해결법 없음 주의)](https://opendeveloper.tistory.com/entry/Error-%EA%B5%AC%EA%B8%80-Oauth-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EC%9D%B8%EC%95%B1-%EC%97%90%EB%9F%AC)

[[ERROR] Prisma 마이그레이션 후 타입스크립트 에러(feat.MongoDB)-해결](https://opendeveloper.tistory.com/entry/ERROR-Prisma-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%9B%84-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%90%EB%9F%ACfeatMongoDB)

[Next.js 13 에서 NextResponse 사용 방법](https://opendeveloper.tistory.com/entry/Nextjs-13-%EC%97%90%EC%84%9C-NextResponse-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95)

<br>

## Deployment

-   Vercel 사용

<br>

## Roadmap

-   v1.0.0: 기본적인 기능 구현 (배포완료)
-   v1.0.1: 버그fix & 모바일 최적화 (배포완료)
-   v1.0.2: 버그fix 안정화(배포완료)

<br>

## Contact

-   이메일: tmskqj@gmail.com
-   블로그: https://opendeveloper.tistory.com/

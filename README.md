# <p align="center">쇼핑몰 웹 서비스를 모델링 한 프로젝트

<p align="center"> 📆 2022.11.14~ 2023.11.25 2주간

## 팀 프로젝트 레포 및 README

- https://github.com/zhwltlr/39-1st-naweke-frontend

## 프로젝트 배포

- 리뷰 페이지 중점으로 배포된 주소입니다.(/main, /login, /signup 확인 가능합니다.)
- https://zhwltlr.github.io/naweke-react-firebase/

<br>
<br>
  
<img width="1386px" alt="nawekeMain" align="center" src="https://user-images.githubusercontent.com/100506719/215711140-28e62c9b-ad4f-4e99-aabb-81a328bedf59.gif"/>

<br>

## 구현 목적

- 고객 운동 스타일에 맞는 UX 중심의 Naweke 편집숍
  - 운동에 관심이 많은 고객을 타깃으로 런닝, 축구, 농구로 세분화 된 상품 제공
  - 로그인 => 상품 검색 => 상세 정보 => 구매 => 장바구니 => 결제내역으로 이어지는 이커머스 시스템 구현
  - 구매 외에 고객이 참여할 수 있는 리뷰 페이지 구현하여 양방향의 소통이 가능

## DEMO

- <a href="https://drive.google.com/file/d/1o3aAmo0GASWMJtAZsgmTNhARpc6Af1Y9/view?usp=share_link" :target="_blank">📎 시연 영상</a>

## Team

`FE` 4명 <br>
`BE` 3명

<br/>

## 담당 기능

#### <b>1. Firebase를 이용한 리뷰 페이지</b>

- <b>Firebase를 이용하여 리팩토링한 페이지로, firestore에 데이터를 저장하고, 등록, 수정 및 삭제가 가능하게 구현하였습니다.</b>

- 고객이 구매한 상품만 리뷰 등록이 가능하게 하여 구매한 order 각각에 리뷰 표시
- 주문내역에서는 리뷰 등록, 리뷰 내역에서는 수정 및 삭제가 가능하게 하기 위해서 Review Component 생성

  ```
  Payment.js
    ┣ PaymentProducts.js
        ┣ Review // 리뷰 등록
    ┣ PayReview.js
        ┣ Review // 리뷰 수정 및 삭제
  ```

  ```
  const CREATE_REVIEW = {
    title: '리뷰 작성하기',
    button: '작성완료',
  };
  const UPDATE_REVIEW = {
    title: '리뷰 수정하기',
    button: '수정하기',
  };
  ------------------------------------------------
  <ReviewModal
    reviewData={controlReview ? UPDATE_REVIEW : CREATE_REVIEW}
  />
  ```

  - 하나의 컴포넌트로 등록, 수정, 삭제를 관리하기 위하여 Review 컴포넌트에서는 등록과 수정/삭제를 구분하는 상수데이터를 만든 후, controlReview(boolean) state에 따라 ReviewModal에 전달되는 데이터를 관리
  - 수정/삭제를 위한 Modal일 경우, 사용자가 등록한 데이터를 불러와서 사용자가 편하게 수정 가능

- 리뷰 데이터의 경우, 사용자의 등록, 수정, 삭제에 따라 데이터가 실시간으로 바뀌기 때문에 firebase onSnapshot을 통해 firebase 데이터가 바뀔 때마다 리뷰 리스트도 업데이트

  ```
  const reviewFirebase = async () => {
    onSnapshot(reviewRef, snap => {
      let newArr = [];
      snap.forEach(doc => {
        newArr.push(doc.data());
      });
      setReviewList(newArr);
    });
  };
  reviewFirebase();
  ```

- alert으로 리뷰의 등록, 수정, 삭제에 대한 안내 제공
  <br />

<img src="https://user-images.githubusercontent.com/100506719/215712804-c4c30ade-79ce-47a3-ab56-025e1cbc52a2.gif" width="900px" align="center" />
<br />
<br />
<br />

#### <b>2. product list filtering 기능 구현</b>

- querystring을 활용하여 조건별 검색이 가능한 상품 리스트 페이지 구현하여 사용자가 보다 편리하게 원하는 검색 결과를 찾을 수 있도록 표현
- 사용자가 선택하는 size, color, price, gender value 값을 받아서 저장
  ```
  const { name, value, id } = e.target;
  setSelectValue(prev => ({ ...prev, [name]: value }));
  ```
- 받은 name, value 값을 searchParams.set(name, value)로 저장하여 select된 값에 맞는 데이터로 정렬
- 필터 초기화가 될 경우, subCategory(running, soccer, basketball)에 대한 정렬은 유지된 채 세부적인 filtering만 초기화 시키기 위한 함수 작성

  ```
  const initailFilter = () => {
    const currentQuery = searchParams.toString();
    const removePoint = currentQuery.split('&')[0];
    navigate(`/products?${removePoint}`);
  };
  ```

- 사이즈를 제외한 분류 조건은 단일선택이 가능하게끔 radio, 사이즈는 다중 선택이 가능하게끔 checkbox를 사용하였고, 사용자가 분류조건을 한 눈에 알아보고 적용할 수 있게 디자인

<br/>

<img src="public/images/productfilter.gif" align="center" width="800px">
<br/>
<br/>

#### <b>3. 하나의 컴포넌트로 로그인 및 회원가입 관리</b>

- User 컴포넌트 하나로 로그인과 회원가입을 관리하기 위해 각각의 본문 내용을 상수데이터로 만들어서 isSelectLogin state로 관리
  ```
  const isSelectLogin =
    window.location.pathname === `${process.env.PUBLIC_URL}/login`;
  ```
- 정규 표현식을 통한 아이디, 비밀번호 유효성 검사
<p align="center">
<img src="public/images/loginSignup.gif" width="300px"/>
<img src="https://user-images.githubusercontent.com/100506719/215703351-7ffdb38e-5a9c-402a-b486-d7e3240b2578.gif" width="300px"/>
</p>

<br />
<br />

#### <b>4. main 페이지 구현</b>

- 운동 스타일을 제안하는 편집샵의 느낌을 주기 위한 레이아웃 애니메이션 추가

<br />

## Tools

- `Notion`, `Trello`, `Github`, `Slack`

## Engineering Stack

- FE:
  - `JavaScript`, `React`, `Sass`
- BE:
  - `JavaScript`, `Node.js`, `AWS`, `MySql`

<br />

---

## 회고 및 느낀점

- <a href="https://blog.naver.com/zhwltlr/222939702281" :target="_blank">📎기업협업 회고</a>

- 주문내역 페이지는 리팩토링을 통해 review 컴포넌트 하나로 등록, 수정, 삭제가 가능하도록 하였습니다.
- 기존 코드에서 등록과 수정,삭제 modal을 분리하였으나 로그인, 회원가입처럼 하나의 컴포넌트로 관리하는 것이 더 효율적일 것이라 판단하였습니다.
- Review 컴포넌트로 리팩토링을 해보니 로그인, 회원가입을 관리하는 User 컴포넌트보다도 더 유용한 것을 깨달았습니다.
- 회원가입의 경우 추가정보를 입력해야해서 로그인과 다른 input 개수를 갖는 반면, 리뷰는 똑같은 틀 안에서 데이터의 유무만 관리해주면 되기 때문입니다.
- Firebase를 통해 데이터를 저장하고 관리할 수 있는 로직을 처음 구현할 땐 어려움이 있었으나 리뷰의 CRUD가 모두 제대로 작동하는 모습을 봤을 땐 희열이 느껴졌습니다.
- Product list 페이지 Filtering을 핸들링 하는 과정에서 코드가 긴 것이 고민입니다.

  ```
  if (name === 'size') {
    searchParams.append(name, value);
    setSearchParams(searchParams);
    filtering(searchParams.toString());
  } else if (name === 'price') {
    searchParams.set(name, id);
    setSearchParams(searchParams);
    filtering(searchParams.toString());
  } else {
    searchParams.set(name, value);
    setSearchParams(searchParams);
    filtering(searchParams.toString());
  }
  ```

  - size의 경우는 다중선택이기 때문에 append를, price의 경우 id 값을 서버에 보내줘야해서 set(name,id)를, 이 외에는 set(name,value)로 핸들링 하였지만 비슷한 코드 진행이 반복되고 있습니다.
  - 다중 선택과 단일 선택을 위한 코드 진행보다는 price 조건에서 (name, id)를 수정하는 것이 좋아보입니다.

<br>

---

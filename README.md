# DG.com
# 프로젝트소개
- 의류, 악세사리 등 다양한 브랜드를 가진 온라인 쇼핑몰

-> 선택 이유 : 가장 흔하지만 많은 데이터를 카테고리별로 필터처리 하며 데이터를 다뤄볼 수 있으며 사고 팔수 있는 결제기능부터 jwt token,Spring security를 통한 Client 정보 보안 기능 등 다양한 기능들을 다뤄 볼 수 있어서 선택하였습니다.

# 프로젝트 일정 및 규모
- 개발 기간 : 2022.11.04 ~ 12.01
- 인원 : 5명
- Role 
1) 상품상세페이지
 → 컴포넌트를 구분하여 상품에 대한 정보를 나타냄. (이미지, 구매, 공지사항, 리뷰 등)
 → 별점의 경우 axios로 해당 상품에 대한 후기 수와 별점을 평균내어 보여줌
 → 마우스 커서 좌표에 따라 해당 이미지에 확대된 부분을 보여줌
 → 옵션을 선택하면 해당 상품에 선택한 사이즈가 추가되며, 수량을 증가, 감소 가능
 → 옵션을 선택하면 구매 및 장바구니 추가가 가능하며, 동일한 상품이 있으면 알림 발생.
 
2) 장바구니
 → 장바구니에 추가된 상품을 모두 보여줌
 → 전체 또는 개별 선택/취소/삭제/결제 가능함
 → 상품 수량이 많으면 페이징 처리되도록 구현
 → 결제하기를 누르면 구매 정보 입력창이 발생하며, 기본값은 유저정보로 표시됨.
 → 정보 누락 시, 알림이 발생하며 결제되지 않음.
 → 카카오 주소 API를 이용하여 검색하여 변경 가능.
 
3) 결제
 → 아임포트를 이용하여 결제를 구현하였으며, 결제 완료 후, 장바구니에서 해당 상품은 삭제됨. 

4) 주문상세내역
 → 결제 완료된 상품은 주문내역 테이블에 저장되며, 주문 시, 고유 주문번호를 생성.
 → 주문번호로 구매한 모든 상품에 정보, 결제 정보, 배송지정보를 보여줌.

# 페이지 주요기능
- 대중적으로 사용하는 온라인 쇼핑몰을 구현. (Kream을 Reference Model로 진행)
- React, Spring Boot를 이용하여 구현.
- React-Router-dom을 이용하여 layout 구성.
- 소셜 로그인, JWT, Spring security를 이용하여 회원가입 및 로그인 구현.
![image](https://user-images.githubusercontent.com/114208462/217546640-40285e9f-c353-4ef0-a9dc-3cf0f4190a14.png)
![image](https://user-images.githubusercontent.com/114208462/217546701-de92de9b-ab54-438f-8622-7dfc0a8e3a6a.png)

- Styled-component를 이용하여 스타일 페이지 구성.
![image](https://user-images.githubusercontent.com/114208462/217546776-59b7f991-a949-402e-ae77-18821e7e7fc7.png)

- 상품 리스트 출력 시, Infinity Scrolling 구현.
![image](https://user-images.githubusercontent.com/114208462/217549470-8f7d3132-ae5f-4185-88ad-62be636af9a8.png)


- 아임포트를 이용하여 결제 기능 구현.

- 상품 추가 및 데이터를 관리할 수 있는 관리자페이지
![image](https://user-images.githubusercontent.com/114208462/217551884-f11339a8-f926-4657-b74e-92d437800cd1.png)


# 개발환경 및 API
![image](https://user-images.githubusercontent.com/114208462/217550291-7e1188b6-2099-44a4-bba9-5d94e3b563b3.png)
![image](https://user-images.githubusercontent.com/114208462/217550367-1d3762e6-741d-4f5a-9508-fa37fc8b2133.png)


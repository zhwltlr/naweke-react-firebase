import React from 'react';
import './Payment.scss';

function PaymentProduct({ paylist }) {
  return (
    <div className="paymentProduct">
      <div className="payProductInfo">
        <ul>
          <li>2022.11.18</li>
          <li>총 주문 금액 {paylist.price} 원</li>
          <li>주문번호 : {paylist.id}</li>
        </ul>
      </div>
      <div className="payProductDetail">
        <img src="/images/nike.png" alt="productImg" />
        <ul className="payDetail">
          <li>{paylist.name}</li>
          <li>{paylist.num}개</li>
          <li>{paylist.price}원</li>
        </ul>
        <ul className="shipment">
          <li>무료배송</li>
          <li>온라인 물류센터</li>
        </ul>
        <div className="payStatus">
          <span>결제완료</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentProduct;

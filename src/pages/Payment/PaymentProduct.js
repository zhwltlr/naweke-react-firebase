import React, { useEffect, useState } from 'react';
import Review from './Review';
import { APIS } from '../../config';
import { firestore } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import './PaymentProduct.scss';

function PaymentProduct({ setControlReview, controlReview }) {
  const [reviewModal, setReviewModal] = useState(false);
  const token = localStorage.getItem('token');

  // firebase orderList
  const [currentProduct, setCurrentProduct] = useState('');
  const [orderList, setOrderList] = useState([]);
  const orderRef = collection(firestore, 'order');
  useEffect(() => {
    const readOrderList = async () => {
      const data = await getDocs(orderRef);
      setOrderList(data.docs.map(doc => ({ ...doc.data() })));
    };
    // 활성화
    readOrderList();
  }, []);

  return orderList.length ? (
    orderList.map((paylist, i) => {
      return (
        <div className="paymentProduct" key={i}>
          <div className="payProductInfo">
            <ul>
              <li>{paylist.createAt}</li>
              <li>총 주문 금액 {paylist.totalPrice.toLocaleString()} 원</li>
              <li>주문번호 : {paylist.orderId}</li>
            </ul>
          </div>
          {paylist.orderProduct.map(
            ({ thumbnailImage, productName, quantity, price }, i) => {
              return (
                <div className="payProductDetail" key={i}>
                  <img src={thumbnailImage} alt="productImg" />
                  <ul className="payDetail">
                    <li>{productName}</li>
                    <li>수량 : {quantity}개</li>
                    <li>{price && price.toLocaleString()}원</li>
                  </ul>
                  <ul className="shipment">
                    <li>무료배송</li>
                    <li>온라인 물류센터</li>
                  </ul>
                  <div className="payStatus">
                    <span>결제완료</span>
                    <button
                      className="reviewBtn"
                      onClick={() => {
                        setControlReview(false);
                        setCurrentProduct(productName);
                        setReviewModal(!reviewModal);
                      }}
                    >
                      리뷰 작성하기
                    </button>
                    {/* 주문내역 모달 */}
                    {reviewModal === true ? (
                      <Review
                        setReviewModal={setReviewModal}
                        controlReview={controlReview}
                        currentProduct={currentProduct}
                      />
                    ) : null}
                  </div>
                </div>
              );
            }
          )}
        </div>
      );
    })
  ) : (
    <div className="noList">주문내역이 없습니다.</div>
  );
}

export default PaymentProduct;

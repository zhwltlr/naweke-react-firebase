import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APIS } from '../../config';
import PaymentProduct from './PaymentProduct';
import PayReview from './PayReview';
import './Payment.scss';

function Payment() {
  const accessToken = localStorage.getItem('token');
  const [paymentData, setPaymentData] = useState([]);
  const [controlReview, setControlReview] = useState(false);

  return (
    <div className="payment">
      <div className="paymentWrap">
        <h2 className="paymentOrder">최근 주문내역</h2>
        <div className="paymentList">
          <PaymentProduct
            controlReview={controlReview}
            setControlReview={setControlReview}
          />
        </div>
        <div />
      </div>
      <PayReview
        controlReview={controlReview}
        setControlReview={setControlReview}
      />
      <Link to="/" className="link">
        메인으로 이동
      </Link>
    </div>
  );
}

export default Payment;

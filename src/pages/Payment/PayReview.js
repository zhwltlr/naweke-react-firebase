import React, { useEffect, useState } from 'react';
import Review from './Review';
import { firestore } from './firebase';
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import './PayReview.scss';

function PayReview({ setControlReview, controlReview }) {
  const token = localStorage.getItem('token');
  const [reviewModal, setReviewModal] = useState(false);
  const [editArr, setEditArr] = useState([]);

  // firebase 리뷰 첫 렌더링
  const [reviewId, setReviewId] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const reviewRef = collection(firestore, 'review');
  useEffect(() => {
    const reviewFirebase = async () => {
      onSnapshot(reviewRef, snap => {
        let newArr = [];
        snap.forEach(doc => {
          newArr.push(doc.data());
        });
        setReviewList(newArr);
      });
    };
    // 활성화
    reviewFirebase();
  }, []);

  const updateGet = async productName => {
    const q = query(
      collection(firestore, 'review'),
      where('productName', '==', productName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setReviewId(doc.id);
      setEditArr(doc.data());
    });
  };

  return (
    <div className="PayReview">
      <div className="showReview">
        <h3>작성된 리뷰</h3>
        <div className="showReviewInner">
          <table>
            <thead>
              <tr>
                <th className="postId">상품명</th>
                <th className="postTitle">제목</th>
                <th className="postScore">평점</th>
                <th className="postText">내용</th>
                <th className="postChange">수정</th>
              </tr>
            </thead>
            {reviewList.length ? (
              reviewList.map((el, i) => {
                return (
                  <tbody key={i}>
                    <tr className="postReview">
                      <td className="postId">{el.productName}</td>
                      <td className="postTitle">{el.title}</td>
                      <td className="postScore">{el.score}</td>
                      <td className="postText">{el.content}</td>
                      <td>
                        <img
                          src="images/editing.png"
                          alt="edit"
                          className="changeBtn"
                          onClick={() => {
                            setControlReview(true);
                            updateGet(el.productName);
                            setReviewModal(!reviewModal);
                          }}
                        />
                        {reviewModal === true ? (
                          <Review
                            setReviewModal={setReviewModal}
                            editArr={editArr}
                            setEditArr={setEditArr}
                            controlReview={controlReview}
                            reviewId={reviewId}
                          />
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <div className="noList">작성된 리뷰가 없습니다.</div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
export default PayReview;

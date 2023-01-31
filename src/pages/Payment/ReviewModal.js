import React from 'react';
import { useState } from 'react';
import { APIS } from '../../config';
import { firestore } from './firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import './ReviewModal.scss';

const ReviewModal = ({
  reviewData: { title, button },
  setReviewModal,
  editArr,
  setEditArr,
  reviewId,
  currentProduct,
}) => {
  const token = localStorage.getItem('token');
  const [review, setReview] = useState({});

  // 리뷰 등록, 수정 input 핸들링
  const newReview = e => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };
  const editReview = e => {
    const { name, value } = e.target;
    setEditArr(prev => ({ ...prev, [name]: value }));
  };

  // firebase
  // 리뷰 생성
  const createReview = currentProduct => {
    try {
      addDoc(collection(firestore, 'review'), {
        title: review.title,
        score: review.score,
        content: review.content,
        productName: currentProduct,
      });
    } catch (err) {
      alert(err);
    }
  };

  // 리뷰 삭제
  const deleteReview = async () => {
    alert('정말 삭제하시겠습니까?');
    await deleteDoc(doc(firestore, 'review', reviewId));
  };

  // 리뷰 수정 업데이트
  const updateReview = async () => {
    const updateRef = doc(firestore, 'review', reviewId);
    await updateDoc(updateRef, {
      content: editArr.content,
      productName: editArr.productName,
      score: editArr.score,
      title: editArr.title,
    });
  };

  return (
    <div className="reviewWrap">
      <div className="reviewContainer">
        <h3>{title}</h3>
        <div className="reviewInner">
          {button === '작성완료' ? (
            <input
              type="text"
              className="reviewTitle"
              name="title"
              placeholder="제목"
              onChange={newReview}
            />
          ) : (
            <input
              type="text"
              className="reviewTitle"
              name="title"
              placeholder="제목"
              onChange={editReview}
              value={editArr.title || ''}
            />
          )}

          <div className="reviewVal">
            <span>
              평점
              {button === '작성완료' ? (
                <>
                  <select
                    className="reviewSelect"
                    name="score"
                    onChange={newReview}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <input
                    type="text"
                    className="reviewInput"
                    placeholder="리뷰를 작성하세요"
                    name="content"
                    onChange={newReview}
                  />
                </>
              ) : (
                <>
                  <select
                    className="reviewSelect"
                    name="score"
                    onChange={editReview}
                    value={editArr.score || ''}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <input
                    type="text"
                    className="reviewInput"
                    placeholder="리뷰를 작성하세요"
                    name="content"
                    value={editArr.content || ''}
                    onChange={editReview}
                  />
                </>
              )}
            </span>
          </div>

          {button === '작성완료' ? (
            <div className="reviewBtnFlex">
              <button
                className="reviewButton backWhite"
                onClick={() => {
                  setReviewModal(false);
                }}
              >
                취소하기
              </button>
              <button
                className="reviewButton"
                onClick={() => {
                  createReview(currentProduct);
                  setReviewModal(false);
                  alert('리뷰가 등록 되었습니다!');
                }}
              >
                {button}
              </button>
            </div>
          ) : (
            <div className="reviewBtnFlex">
              <button
                className="reviewButton backWhite"
                onClick={() => {
                  setReviewModal(false);
                }}
              >
                취소하기
              </button>
              <button
                className="reviewButton backWhite"
                onClick={() => {
                  deleteReview();
                  setReviewModal(false);
                  alert('리뷰가 삭제되었습니다');
                }}
              >
                삭제하기
              </button>
              <button
                className="reviewButton"
                onClick={() => {
                  updateReview();
                  setReviewModal(false);
                  alert('리뷰가 수정 되었습니다!');
                }}
              >
                {button}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

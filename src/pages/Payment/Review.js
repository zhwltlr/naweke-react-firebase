import React from 'react';
import ReviewModal from './ReviewModal';

function Review({
  setReviewModal,
  controlReview,
  editArr,
  setEditArr,
  reviewId,
  currentProduct,
}) {
  const CREATE_REVIEW = {
    title: '리뷰 작성하기',
    button: '작성완료',
  };
  const UPDATE_REVIEW = {
    title: '리뷰 수정하기',
    button: '수정하기',
  };
  return (
    <div className="Review">
      <ReviewModal
        reviewData={controlReview ? UPDATE_REVIEW : CREATE_REVIEW}
        setReviewModal={setReviewModal}
        editArr={editArr}
        setEditArr={setEditArr}
        reviewId={reviewId}
        currentProduct={currentProduct}
      />
    </div>
  );
}

export default Review;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";

const CreateReviewModal = ({spot, navigateToSpot}) => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    const errs = {}
    if(review.length < 10){
      errs.review = "Minimum 10 characters for a review!!"
    }
    setErrors(errs)
  }, [review])

  const handleSubmit = async e => {
    e.preventDefault()
    const newReview = {review, stars}
    await dispatch(postReview(spot.id, newReview))
    closeModal()
    navigateToSpot(`/spots/${spot.id}`)
  }

  return (
    <form className="reviewform" onSubmit={handleSubmit}>
      <h3>How was your stay?</h3>

      {errors.review && <span className="errormsg">{errors.review}</span>}
      <label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here..."
          />
      </label>

      <span className="star">&#9734;</span>
      <span className="star">&#9734;</span>
      <span className="star">&#9734;</span>
      <span className="star">&#9734;</span>
      <span className="star">&#9734;</span>

      <div>
        <button
          disabled={Object.values(errors).length}
        >
          Submit Your Review</button>
      </div>
    </form>
  );
};


export default CreateReviewModal

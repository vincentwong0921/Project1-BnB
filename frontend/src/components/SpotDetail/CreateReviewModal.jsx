import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postReview } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";

const CreateReviewModal = ({ spot, navigateToSpot }) => {
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const errs = {};
    if (review.length < 10) {
      errs.review = "Minimum 10 characters for a review!!";
    }
    setErrors(errs);
  }, [review]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newReview = { review, stars };
      await dispatch(postReview(spot.id, newReview));
      await dispatch(getOneSpot(spot.id))
      closeModal();
      navigateToSpot(`${spot.id}`);
    } catch(error){
      const errs = await error.json()
      setErrors(errs.errors)
    }
  };

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

      {errors.stars && <span className="errormsg">{errors.stars}</span>}
      <div className="stars">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={Number(currentRating)}
                onClick={() => setStars(Number(currentRating))}
              />
              <i
                className="fa-solid fa-star"
                style={{
                  color:
                    currentRating <= (hover || stars) ? "#000000" : "#e4e5e9",
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              ></i>
            </label>
          );
        })}
      </div>

      <div>
        <button
          className="submitreviewbutton"
          disabled={Object.values(errors).length}
        >
          Submit Your Review
        </button>
      </div>
    </form>
  );
};

export default CreateReviewModal;

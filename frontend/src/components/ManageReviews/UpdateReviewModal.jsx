import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllReviewsOfCurrentUser, updateReview } from "../../store/reviews";

const UpdateReviewModal = ({ prereview }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(null);
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState(prereview.review);

    useEffect(() => {
        const errs = {};
        if (review.length < 10) {
          errs.review = "Minimum 10 characters for a review!!";
        }
        setErrors(errs);
      }, [review]);

    const handleSubmit = async e => {
        try{
            e.preventDefault()
            prereview = {...prereview, review, stars}
            const editedReview = await dispatch(updateReview(prereview))
            prereview = editedReview
            await dispatch(getAllReviewsOfCurrentUser())
            closeModal()
        } catch (error){
            const errs = await error.json()
            setErrors(errs.errors)
        }
    }

    return(
        <form className="reviewform" onSubmit={handleSubmit}>

        <h3>How was your stay at {prereview?.Spot?.name}?</h3>

        {errors.review && <span className="errormsg">{errors.review}</span>}
        <label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
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
            Update Your Review
          </button>
        </div>
      </form>
    )
}


export default UpdateReviewModal

import { useSelector } from "react-redux";
import { formatDate } from "../../utils/function";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../SpotDetail/DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { useEffect } from "react";
import { getAllReviewsOfCurrentUser } from "../../store/reviews";
import { useDispatch } from "react-redux";

const ManageReviews = () => {
  const dispatch = useDispatch()
  const reviews = Object.values(
    useSelector((state) => (state.reviews ? state.reviews : null))
  );

  useEffect(() => {
    dispatch(getAllReviewsOfCurrentUser())
  }, [dispatch])


  if (!reviews) return <>Loading...</>;

  return (
    <div className="managereviewspage">
      <h1>Manage Reviews</h1>
      <ul className="reviewslist">
        {reviews &&
          reviews.map((review) => (
            <div key={review.id} className="reviewitem">
              <li className="firstname">{review?.Spot?.name}</li>
              <li className="reviewdate">{formatDate(review?.createdAt)}</li>
              <li>{review.review}</li>

              <div className="managereviewbuttons">
                <OpenModalButton
                    buttonText="Update"
                    modalComponent={<UpdateReviewModal prereview={review} />}
                />
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal review={review} />}
                />
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ManageReviews;

import { useSelector } from "react-redux";
import { getAllReviewsOfCurrentUser } from "../../store/reviews";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/function";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../SpotDetail/DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";

const ManageReviews = () => {
  const reviews = Object.values(
    useSelector((state) => (state.reviews ? state.reviews : null))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsOfCurrentUser());
  }, [dispatch]);

  if (!reviews) return <>Loading...</>;

  return (
    <>
      <h1>Manage Reviews</h1>
      <ul>
        {reviews &&
          reviews.map((review) => (
            <div key={review.id} className="reviewitem">
              <li className="firstname">{review?.Spot?.name}</li>
              <li className="reviewdate">{formatDate(review?.createdAt)}</li>
              <li>{review.review}</li>

              <span>
                <OpenModalButton
                    buttonText="Update"
                    modalComponent={<UpdateReviewModal review={review} />}
                />
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal review={review} />}
                />
              </span>
            </div>
          ))}
      </ul>
    </>
  );
};

export default ManageReviews;

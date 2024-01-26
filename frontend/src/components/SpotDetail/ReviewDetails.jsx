import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import { formatRating } from "../../utils/function";
import { formatDate } from "../../utils/function";

const ReviewDetails = ({ spotId, navigateToSpot }) => {
  let reviews = Object.values(
    useSelector((state) => (state.reviews ? state.reviews : null))
  );

  reviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const spot = useSelector(state => state.spots ? state.spots[spotId] : null)

  const currentUser = useSelector((state) => state.session.user ? state.session.user : null);

  const userIsNotTheSpotOwner = currentUser?.id !== spot?.Owner?.id;

  let userDidPostReview = reviews.find(
    (review) => review.userId === currentUser?.id
  );

  if (userDidPostReview === undefined) {
    userDidPostReview = false;
  } else {
    userDidPostReview = true;
  }

  if(!spot || !reviews) return <>Loading....</>

  return (
    <>
      <div>
        <i className="fa-solid fa-star"></i>
        {spot.numReviews === 0 ? (
          <span className="createreviewmodal">
            <span className="NEW">NEW</span>
            {!userDidPostReview && userIsNotTheSpotOwner && currentUser ? (
              <div className="postreviewbutton">
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={
                    <CreateReviewModal
                      spot={spot}
                      navigateToSpot={navigateToSpot}
                    />
                  }
                />
              </div>
            ) : null}
            <p>Be the first to post a review!</p>
          </span>
        ) : (
          <span>
            <span className="numreviews">
              {formatRating(spot.avgStarRating)} · {spot.numReviews}{" "}
              {spot.numReviews > 1 ? "reviews" : "review"}
            </span>

            <div className="postyourreviewbutton">
              {!userDidPostReview && userIsNotTheSpotOwner && currentUser ? (
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={
                    <CreateReviewModal
                      spot={spot}
                      navigateToSpot={navigateToSpot}
                    />
                  }
                />
              ) : null}
            </div>

            <ul className="reviews">
              {reviews &&
                reviews.map((review) => (
                  <div key={review.id} className="reviewitem">
                    <li className="firstname">{review?.User?.firstName} {review?.User?.lastName}</li>
                    <li className="reviewdate">
                      {formatDate(review?.createdAt)}
                    </li>
                    <li>{review.review}</li>
                    {review.userId === currentUser?.id ? (
                      <div className="deleteyourreviewbutton">
                        <OpenModalButton
                          buttonText="Delete"
                          modalComponent={
                          <DeleteReviewModal
                            review={review}
                            spot={spot}
                          />}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
            </ul>
          </span>
        )}
      </div>
    </>
  );
};

export default ReviewDetails;

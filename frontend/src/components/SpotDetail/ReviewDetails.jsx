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

  const spot = useSelector(state => state.spots ? state.spots[spotId] : null)


  reviews = reviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const currentUser = useSelector((state) =>
    state.session.user ? state.session.user : null
  );
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
          <>
            <span className="NEW">NEW</span>
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
            <p>Be the first to post a review!</p>
          </>
        ) : (
          <span>
            <span className="numreviews">
              {formatRating(spot.avgStarRating)} · {spot.numReviews}{" "}
              {spot.numReviews > 1 ? "reviews" : "review"}
            </span>

            <div>
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

            <ul>
              {reviews &&
                reviews.map((review) => (

                  <div key={review.id} className="reviewitem">
                    <li className="firstname">{review?.User?.firstName}</li>
                    <li className="reviewdate">
                      {formatDate(review?.createdAt)}
                    </li>
                    <li>{review.review}</li>
                    {review.userId === currentUser?.id ? (
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={
                        <DeleteReviewModal
                          review={review}
                          spot={spot}
                        />}
                      />
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

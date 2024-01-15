import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useEffect } from "react";
import { getAllReviews } from "../../store/reviews";

const SpotShow = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots ? state.spots[spotId] : null)
  const reviews = Object.values(useSelector(state => state.reviews ? state.reviews : null))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId]);

  return (
    <>
      <div>
        {spot && reviews ? (
          <>
            <div>
              <h2>{spot.name}</h2>
              {spot.city}, {spot.state}, {spot.country}
            </div>

            <div>
              {spot.SpotImages && spot.SpotImages.length > 0 && (
                  <ul>
                  {spot.SpotImages.map((spotImage) => (
                      <li key={spotImage.id}>
                      <img
                          src={spotImage.url}
                          alt={`${spotImage.id}`}
                          className="firstImage"
                      />
                      </li>
                  ))}
                  </ul>
              )}
            </div>

            <div className="Spot-Info">
              <div>
                  <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                  {spot.description}
              </div>

              <div>
                  <div>
                    ${spot.price} night
                    <i className="fa-solid fa-star"></i>
                    {spot.avgStarRating}#{spot.numReviews} Reviews
                  </div>

                  <div>
                    <button>Reserve</button>
                  </div>

              </div>
            </div>

            <div>
                <i className="fa-solid fa-star"></i>
                {spot.avgStarRating} {spot.numReviews} reviews

                <div className="reviews">
                  <ul>
                    {reviews.map(review => (
                      <li key={review.id}>
                        {review.User.firstName}
                        {review.createdAt}
                        {review.review}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default SpotShow;

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useEffect } from "react";
import { getAllReviews } from "../../store/reviews";

const formatDate = (date) => {
  const dateToChange = new Date(date)
  const options = { month: 'long', year: 'numeric'}
  return dateToChange.toLocaleDateString(undefined, options)
}

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();


  const spot = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
  );

  const reviews = Object.values(
    useSelector((state) => (state.reviews ? state.reviews : null))
  );

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);


  if (!spot || !reviews) return <>Loading.....</>;

  return (
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
          <h3>
            Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
          </h3>
          {spot.description}
        </div>

        <div>
          <div>
            ${spot.price} night
            <i className="fa-solid fa-star"></i>
            {spot.avgStarRating === 0 ? (
              <span>NEW</span>
            ) : (
              <span>
                {" "}
                {spot.avgStarRating} {spot.numReviews} Reviews{" "}
              </span>
            )}
          </div>

          <div>
            <button
              className="reservebutton"
              onClick={() => {
                window.alert("Feature Coming Soon...");
              }}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      <div>
        <i className="fa-solid fa-star"></i>
        {spot.numReviews === 0 ? (
          <span>NEW</span>
        ) : (
          <span>
            {spot.avgStarRating} {spot.numReviews} reviews
            <ul>
              {reviews.map((review) => (
                <div key={review.id}>
                  <li key={review.id}>
                    {review.User.firstName}
                    {formatDate(review.createdAt)}
                    {review.review}
                  </li>
                </div>
              ))}
            </ul>
          </span>
        )}
      </div>
    </>
  );
};

export default SpotDetail;

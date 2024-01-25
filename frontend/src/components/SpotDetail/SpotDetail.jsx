import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { useEffect } from "react";
import { getAllReviewsOfASpot } from "../../store/reviews";
import { useNavigate } from "react-router-dom";
import { formatRating, formatPrice } from "../../utils/function";
import ReviewDetails from "./ReviewDetails";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToSpot = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  const spot = useSelector(state => state.spots ? state.spots[spotId] : null)

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getAllReviewsOfASpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <>Loading.....</>;

  return (
    <div className="spotdetailpage">
      <div>
        <h2>{spot.name}</h2>
        <h3>
          {spot.city}, {spot.state}, {spot.country}
        </h3>
      </div>

      <div className="spotImages">

        <div className="leftimage">
          {spot.SpotImages && spot.SpotImages.length > 0 && (
            <img
              src={spot.SpotImages[0].url}
              alt={`${spot.SpotImages[0].id}`}
              className="firstImage"
            />
          )}
        </div>

        <div className="righttopimages">
          {spot.SpotImages && spot.SpotImages.length > 1 && (
            <div>
              <ul>
                {spot.SpotImages.slice(1, 3).map((spotImage) => (
                  <li key={spotImage.id}>
                    <img
                      src={spotImage.url}
                      alt={`${spotImage.id}`}
                      className="otherImage"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rightbottom">
          {spot.SpotImages && spot.SpotImages.length > 1 && (
            <div>
              <ul>
                {spot.SpotImages.slice(3, 5).map((spotImage) => (
                  <li key={spotImage.id}>
                    <img
                      src={spotImage.url}
                      alt={`${spotImage.id}`}
                      className="otherImage"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      <div className="Spot-Info">
        <div>
          <h3>
            Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
          </h3>
          {spot.description}
        </div>

        <div className="pricereview">
          <div>
            <span className="pricepernight">${formatPrice(spot.price)} night </span>
            <i className="fa-solid fa-star"></i>
            {spot.avgStarRating === 0 ? (
              <span>NEW</span>
            ) : (
              <span>
                {formatRating(spot.avgStarRating)} · {spot.numReviews}{" "}
                {spot.numReviews > 1 ? "reviews" : "review"}
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
        <ReviewDetails
          spotId={spotId}
          navigateToSpot={navigateToSpot}
        />
      </div>
    </div>
  );
};

export default SpotDetail;

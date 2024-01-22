import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { formatRating } from "../../utils/function";
import { formatPrice } from "../../utils/function";


const SpotsLandingPage = () => {
  const dispatch = useDispatch();
  let spots = Object.values(useSelector((state) => (state.spots ? state.spots : null)));

  spots = spots.sort((a, b) => b.id - a.id);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if(!spots) return<>Loading...</>

  return (
    <section>
      <div className="spotshow">
        {spots && spots.map((spot) => (
          <div className="spotsbox" key={spot?.id}>
            <Link to={`/spots/${spot?.id}`}>
              <img
                src={spot?.previewImage}
                className="spotimage"
                title={spot?.name}
              ></img>
            </Link>
            <div className="SpotDetail">
              <div className="citystaterating">
                {spot?.city}, {spot?.state}
                <div>
                  <i className="fa-solid fa-star"></i>
                  {spot?.avgRating === 0 ? "NEW" : formatRating(spot?.avgRating)}
                </div>
              </div>
              <span style={{ fontWeight: "bold" }}>${formatPrice(spot?.price)}</span> per
              night
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpotsLandingPage;

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getOwnedSpots } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatRating } from "../../utils/function";
import DeleteSpotModal from './DeleteSpotModal'
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const ManageSpots = () => {
  const spots = Object.values(
    useSelector((state) => (state.spots ? state.spots : null))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwnedSpots());
  }, [dispatch]);

  const createSpotClick = (e) => {
    e.preventDefault();
    navigate("/spots/new");
  };


  if (!spots) return <>Loading....</>;

  return (
    <>
      <div className='managespotfirstdiv'>
        <h2>Manage Spots</h2>
        <button onClick={createSpotClick}>Create a New Spot</button>
      </div>

      <div className="managespotcontainer">
        <ul>
            {spots &&
            spots.map((spot) => (
                <li key={spot.id}>
                <Link to={`/spots/${spot.id}`}>
                    <img
                    src={spot.previewImage}
                    className="spotimage"
                    title={spot.name}
                    alt={spot.name}
                    />
                </Link>

                <div className="SpotDetail">
                    <div className="citystaterating">
                    {spot.city}, {spot.state}
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating === 0 ? "NEW" : formatRating(spot.avgRating)}
                    </div>
                    </div>

                    <span style={{ fontWeight: "bold" }}>${spot.price}</span> night

                    <div>
                        <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={
                                <DeleteSpotModal
                                    spot={spot}
                                />
                            }
                        />
                    </div>
                </div>
                </li>
            ))}
        </ul>
      </div>
    </>
  );


};

export default ManageSpots;

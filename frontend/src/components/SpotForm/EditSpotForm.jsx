import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import CreateNewSpot from "./SpotForm";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) =>
    state.spots ? state.spots[spotId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <></>;

  return (
    <>
      {Object.keys(spot).length > 1 && (
        <>
          <CreateNewSpot
            spot={spot}
            formType="Update Spot" />
        </>
      )}
    </>
  );
};

export default EditSpotForm;

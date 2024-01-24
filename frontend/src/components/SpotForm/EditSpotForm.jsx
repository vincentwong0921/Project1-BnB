import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotForm from "./SpotForm";
import { getOneSpot } from "../../store/spots";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpot = async () => {
      await dispatch(getOneSpot(spotId));
      setLoaded(true);
    };

    fetchSpot();
  }, [dispatch, spotId]);

  if (!loaded) return <>Loading...</>;

  return (
    <>
      <SpotForm spot={spot} formType="Update Spot" />
    </>
  );
};

export default EditSpotForm;

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeSpot } from "../../store/spots";

const DeleteSpotModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmdelete = async (e) => {
    e.preventDefault();
    await dispatch(removeSpot(spot.id));
    closeModal();
  };

  const notDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form className="deleteformModal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>

      <div>
        <button className="deletespotbutton" onClick={confirmdelete}>
          Yes (Delete Spot)
        </button>
      </div>
      <div>
        <button onClick={notDelete} className="notdeletespotbutton">
          No (Keep Spot)
        </button>
      </div>
    </form>
  );
};

export default DeleteSpotModal;

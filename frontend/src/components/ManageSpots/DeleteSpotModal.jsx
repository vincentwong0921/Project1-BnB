import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeSpot } from "../../store/spots";

const DeleteSpotModal = ({spot}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const confirmdelete = async e => {
        e.preventDefault();
        await dispatch(removeSpot(spot.id))
        closeModal()
    }

    const notDelete = e => {
        e.preventDefault()
        closeModal()
    }

    return(
        <form>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>

            <button onClick={confirmdelete}>Yes (Delete Spot)</button>
            <button onClick={notDelete}>No (Keep Spot)</button>
        </form>
    )
}


export default DeleteSpotModal

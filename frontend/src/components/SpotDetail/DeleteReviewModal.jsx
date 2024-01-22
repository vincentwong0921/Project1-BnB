import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeReview } from "../../store/reviews";

const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const confirmdelete = async e => {
        e.preventDefault();
        await dispatch(removeReview(review.id))
        closeModal()
    }

    const notDelete = e => {
        e.preventDefault()
        closeModal()
    }

    return(
        <form>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>

            <div>
                <button onClick={confirmdelete}>Yes (Delete Review)</button>
                <button onClick={notDelete}>No (Keep Review)</button>
            </div>
        </form>
    )
}

export default DeleteReviewModal

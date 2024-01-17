import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

/* Action Creator */
export const loadAllReviews = reviews => ({
    type: LOAD_REVIEWS,
    reviews
})

export const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

export const editReview = review => ({
    type: UPDATE_REVIEW,
    review
})

export const deleteReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
})


/* Thunk */

export const getAllReviews = spotId => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const reviews = await response.json()
        dispatch(loadAllReviews(reviews))
    } else {
        const error = await response.json()
        return error
    }
}


/* Reducer */

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const reviewState = {}
            action.reviews.Reviews.forEach(review => reviewState[review.id] = review)
            console.log(reviewState)
            return reviewState
        }
        default:
            return state
    }
}

export default reviewReducer

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

export const getAllReviewsOfASpot = spotId => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const reviews = await response.json()
        dispatch(loadAllReviews(reviews))
    }
}

export const getAllReviewsOfCurrentUser = () => async(dispatch) => {
    const res = await csrfFetch('/api/reviews/current')

    if(res.ok){
        const reviews = await res.json()
        dispatch(loadAllReviews(reviews))
    }
}

export const postReview = (spotId, review) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if(res.ok){
        const newReview = await res.json()
        dispatch(receiveReview(newReview))
        return newReview
    }
}

export const updateReview = review => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if(res.ok){
        const newReview = await res.json()
        dispatch(editReview(newReview))
        return newReview
    }
}

export const removeReview = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(res.ok){
        dispatch(deleteReview(reviewId))
    }
}

/* Reducer */

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const reviewState = {}
            action.reviews.Reviews.forEach(review => reviewState[review.id] = review)
            return reviewState
        }
        case RECEIVE_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
        case UPDATE_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
        case REMOVE_REVIEW: {
            const newReviewState = {...state}
            delete newReviewState[action.reviewId]
            return newReviewState
        }
        default:
            return state
    }
}

export default reviewReducer

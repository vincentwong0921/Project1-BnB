import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const RECEIVE_SPOT = 'spots/RECEIVE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const REMOVE_SPOT = 'spots/REMOVE_SPOT'
const RECEIVE_SPOT_IMAGES = 'spots/RECEIVE_SPOT_IMAGES'
const UPDATE_SPOT_IMAGES = 'spots/UPDATE_SPOT_IMAGES'

/* Action Creator */
export const loadAllSpots = spots => ({
    type: LOAD_SPOTS,
    spots
})

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const editSpot = spot => ({
    type: UPDATE_SPOT,
    spot
})

export const deleteSpot = spotId => ({
    type: REMOVE_SPOT,
    spotId
})

export const receiveSpotImage = image => ({
    type: RECEIVE_SPOT_IMAGES,
    image
})

export const editSpotImages = image => ({
    type: UPDATE_SPOT_IMAGES,
    image
})

/* Thunk */

export const postSpotImage = (spotId, image) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    })

    if(res.ok){
        const images = await res.json()
        dispatch(receiveSpotImage(images))
    }
}

export const editSpotImage = (spotId, image) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    })

    if(res.ok){
        const images = await res.json()
        dispatch(editSpotImages(images))
    }
}


export const getOwnedSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok){
        const spots = await response.json()
        dispatch(loadAllSpots(spots))
    }
}

export const getAllSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots')
    if(response.ok){
        const spots = await response.json()
        dispatch(loadAllSpots(spots))
    }
}

export const getOneSpot = spotId => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok){
        const spotDetail = await response.json()
        dispatch(receiveSpot(spotDetail))
    }
}

export const createSpot = spot => async(dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if(response.ok){
        const newSpot = await response.json()
        dispatch(receiveSpot(newSpot))
        return newSpot
    }
}

export const updateSpot = spot => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if(response.ok){
        const newSpot = await response.json()
        dispatch(editSpot(newSpot))
        return newSpot
    }
}

export const removeSpot = spotId => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(deleteSpot(spotId))
    }
}

/* Reducer */

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const spotState = {}
            action.spots.Spots.forEach(spot => spotState[spot.id] = spot)
            return spotState
        }
        case RECEIVE_SPOT: {
            return {...state, [action.spot.id] : action.spot}
        }
        case UPDATE_SPOT: {
            return {...state, [action.spot.id] : action.spot}
        }
        case REMOVE_SPOT: {
            const newSpotState = {...state}
            delete newSpotState[action.spotId]
            return newSpotState
        }
        case RECEIVE_SPOT_IMAGES: {
            return {...state, [action.spotId]: action.SpotImages}
        }
        case UPDATE_SPOT_IMAGES: {
            return {...state, [action.spotId]: action.SpotImages}
        }
        default:
            return state
    }
}

export default spotsReducer;

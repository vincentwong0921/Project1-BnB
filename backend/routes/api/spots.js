const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateBooking = [
    check("startDate")
        .exists({checkFalsy: true})
        .withMessage("startDate is required")
        .custom((value) => {
            const today = new Date().getTime();
            if (new Date(value).getTime() < today) {
              throw new Error('startDate cannot be in the past');
            }}),
    check("endDate")
        .exists({checkFalsy: true})
        .withMessage("endDate is required")
        .custom((value, { req }) => {
            const startDate = req.body.startDate;
            if (new Date(value) <= new Date(startDate)) {
              throw new Error('endDate cannot be on or before startDate');
            }}),
    handleValidationErrors
]

const validateReview = [
    check("review")
        .exists({ checkFalsy: true})
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true})
        .isFloat({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
]

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("price")
    .exists({ checkFalsy: true})
    .isFloat({ min: 1 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors,
]

router.get('/', async(req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: Image }
        ]
    })

    const returnData = {}
    let spotsList = []

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        let sum = 0
        spot.Reviews.forEach(review => {
            if(review.stars){
                sum += review.stars
            }
        })

        if(sum !== 0){
            spot.avgRating = sum / spot.Reviews.length
        } else{
            spot.avgRating = 0
        }

        delete spot.Reviews;

        spot.Images.forEach(image => {
            spot.previewImage = image.url
        })

        delete spot.Images;
    })

    returnData.Spots = spotsList

    res.json(returnData)
})

router.get('/current', requireAuth, async(req, res, next) => {
    const user = req.user

    const returnData = {}
    let spotsList = []

    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [{model: Review}, {model: Image}]
    })

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        let sum = 0
        spot.Reviews.forEach(review => {
            if(review.stars){
                sum += review.stars
            }
        })

        if(sum !== 0){
            spot.avgRating = sum / spot.Reviews.length
        } else{
            spot.avgRating = 0
        }

        delete spot.Reviews;

        spot.Images.forEach(image => {
            spot.previewImage = image.url
        })

        delete spot.Images;
    })

    returnData.Spots = spotsList

    res.json(returnData)
})

router.get('/:id', async(req, res) => {
    const id = req.params.id

    let returnData = {}
    let spotList = []

    const spot = await Spot.findOne({
        where:{id},
        include: [
            {model: Review},
            {model: Image, attributes: {exclude: ['imageableId', 'imageableType', 'createdAt', 'updatedAt']}},
            {model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}}
        ]
    })

    if(spot){
        spotList.push(spot.toJSON())

        spotList.forEach(spot => {
            let sum = 0
            spot.Reviews.forEach(review => {
                if(review.stars){
                    sum += review.stars
                }
            })

            let length = spot.Reviews.length

            if(sum !== 0){
                spot.avgRating = sum / spot.Reviews.length
            } else{
                spot.avgRating = 0
            }

            delete spot.Reviews;

            spot.numReviews = length

        })

        returnData = spotList[0]

        returnData.SpotImages = returnData.Images
        delete returnData.Images
        returnData.Owner = returnData.User
        delete returnData.User

        return res.json(returnData)
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})

router.get('/:spotId/reviews', async(req, res, next) => {
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id)

    if(spot){
        const spotReviews = await spot.getReviews({
            where:{spotId: id},
            include: [
                {model: User, attributes: {exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}},
                {model: Image, attributes: {exclude : ['preview', 'imageableId','imageableType', 'createdAt', 'updatedAt']}}
            ]
        })

        const reviewsList = []
        const returnData = {}

        spotReviews.forEach(spotReview => {
            reviewsList.push(spotReview.toJSON())
        })

        reviewsList.forEach(review => {
            review.ReviewImages = review.Images
            delete review.Images
        })

        returnData.Reviews = reviewsList
        return res.json(returnData)
    } else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
})

router.get('/:spotId/bookings', requireAuth, validateBooking, async(req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    const bookings = await Booking.findAll({
        where: {spotId: spot.id},
        include: {model: User, attributes: {exclude: ['username','createdAt', 'updatedAt', 'email', 'hashedPassword']}}
    })

    const bookingsList = [];

    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })

    if(userId !== spot.ownerId){
        const returnData = {};
        const ownerSpot = bookingsList.map(booking => {
            const { id, userId, User, createdAt, updatedAt, ...rest } = booking;
            return rest;
        })
        returnData.Bookings = ownerSpot;
        return res.json(returnData);
    } else{
        const returnData = {};
        returnData.Bookings = bookingsList
        return res.json(returnData)
    }
})

router.post('/', requireAuth, validateSpot, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id

    const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)
})

router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const spotId = Number(req.params.spotId);
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId)
    const bookings = await Booking.findAll({where: {spotId: spotId}})
    const { startDate, endDate } = req.body;

    if(spot.ownerId === userId){
        return res.status(403).json({message: 'Forbidden'})
    }

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    let conflict = false;

    bookings.forEach(booking => {
        const existingStartDate = new Date(booking.startDate).getTime()
        const existingEndDate = new Date(booking.endDate).getTime()
        const newStartDate = new Date(startDate).getTime()
        const newEndDate = new Date(endDate).getTime()

        if(
            newStartDate >= existingStartDate && newStartDate <= existingEndDate ||
            newEndDate >= existingStartDate && newEndDate <= existingEndDate ||
            newStartDate <= existingStartDate && newEndDate >= existingEndDate
        ){
            conflict = true;
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403;
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            next(err)
        }
    })

    if(conflict === true) {
        return
    } else {
        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        })

        return res.json(newBooking);
    }
})

router.post('/:spotId/images', requireAuth, async(req, res) => {
    const id = req.params.spotId;

    const { url, preview } = req.body;

    const spot = await Spot.findByPk(id)

    if(spot){
        const image = await Image.create({
            url,
            preview,
            imageableId: id,
            imageableType: 'Spot'
        })

        const returnData = await Image.findByPk(image.id, {attributes:{exclude: ['imageableId', 'imageableType', 'createdAt', 'updatedAt']}})

        res.json(returnData)
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})

router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res, next) => {
    const userId = req.user.id;
    const spotId = Number(req.params.spotId);
    const { review , stars } = req.body;

    const spot = await Spot.findByPk(spotId)

    if(spot){
        const existingReview = await Review.findOne({
            where: {
                userId: userId,
                spotId: spotId
            }
        })

        if(!existingReview){
            const newReview = await Review.create({userId, spotId, review, stars})
            return res.status(201).json(newReview)
        } else {
            res.status(500).json({message: "User already has a review for this spot"})
        }
    } else{
        return res.status(400).json({message: "Spot couldn't be found"})
    }
})

router.put('/:spotId', requireAuth, validateSpot, async(req, res) => {
    const id = req.params.spotId;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(id)

    if(spot){
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        return res.json(spot)

    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})


router.delete('/:spotId', requireAuth, async(req, res) => {
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id)

    if(spot){
        await spot.destroy()
        return res.json({message: "Successfully deleted"})
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})


module.exports = router

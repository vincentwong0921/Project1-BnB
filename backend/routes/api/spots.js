const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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


module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

module.exports = router;

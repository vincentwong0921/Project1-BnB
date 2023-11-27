const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image } = require("../../db/models");

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




module.exports = router;

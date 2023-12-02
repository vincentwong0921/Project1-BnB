const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id;
    const reviewLists = []
    const returnData = {}

    const reviews = await Review.findAll({
        where: {userId: userId},
        include: [
            {model: User, attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}},
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']},
                include: {model: Image, attributes: {exclude: ['id', 'preview', 'imageableId', 'imageableType', 'createdAt', 'updatedAt']}}},
            {model: Image, attributes: {exclude: ['preview', 'imageableId', 'imageableType', 'createdAt', 'updatedAt']}}
        ]
    })

    reviews.forEach(review => {
        reviewLists.push(review.toJSON())
    })

    reviewLists.forEach(review => {
        if(review.Spot.Images.length !== 0){
            review.Spot.previewImage = review.Spot.Images[0].url
            delete review.Spot.Images
        } else{
            review.Spot.previewImage = 'No Url provided'
            delete review.Spot.Images
        }

        review.ReviewImages = review.Images
        delete review.Images
    })

    returnData.Reviews = reviewLists;
    res.json(returnData)
})








module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const e = require("express");

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

router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId)

    if(!review){
        return res.status(404).json({message: "Review couldn't be found"})
    } else if(review.userId !== userId){
        return res.status(403).json({message: 'Forbidden'})
    } else {
        const images = await Image.findAll({where: {imageableId: review.id}})

        if(images.length >= 10){
            return res.status(403).json({message: "Maximum number of images for this resource was reached"})
        } else {
            const newImage = await Image.create({
                url,
                preview: 1,
                imageableId: review.id,
                imageableType: 'Review'
            })

            const returnData = {id: newImage.id, url: newImage.url}

            return res.json(returnData)
        }
    }
})







module.exports = router;

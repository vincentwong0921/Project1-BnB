const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: {userId: userId},
        include: {model: Spot, attributes: {exclude: ['description','createdAt', 'updatedAt']},
            include: {model: Image, attributes: {exclude: ['preview', 'imageableId', 'imageableType', 'createdAt', 'updatedAt']}}
        }
    })

    const bookingsList = [];
    const returnData = {};

    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    })

    bookingsList.forEach(booking => {
        booking.Spot.previewImage = booking.Spot.Images[0].url
        delete booking.Spot.Images
    })

    returnData.Bookings = bookingsList;

    res.json(returnData)
})

module.exports = router

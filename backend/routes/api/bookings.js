const express = require("express");

const { requireAuth } = require("../../utils/auth");
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

router.put('/:bookingId', requireAuth, validateBooking, async(req, res, next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const today = new Date().getTime();
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId);
    const existingStartDate = new Date(booking.startDate).getTime();
    const existingEndDate = new Date(booking.endDate).getTime();
    const newStartDate = new Date(startDate).getTime()
    const newEndDate = new Date(endDate).getTime()

    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    }

    if(booking.userId !== userId){
        return res.status(403).json({message: 'Forbidden'})
    }

    let conflict = false;

    if(today >= existingEndDate){
        return res.status(403).json({message: "Past bookings can't be modified"})
    } else if(
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

    if(conflict === true){
        return
    } else {
        booking.update({
            startDate, endDate
        })
        return res.json(booking)
    }
})

module.exports = router

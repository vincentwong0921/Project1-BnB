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
        booking.Spot.lat = Number(booking.Spot.lat)
        booking.Spot.lng = Number(booking.Spot.lng)
        booking.Spot.price = Number(booking.Spot.price)

        booking.Spot.previewImage = booking.Spot.Images[0].url
        delete booking.Spot.Images
    })

    returnData.Bookings = bookingsList;

    res.json(returnData)
})

router.put('/:bookingId', requireAuth, async(req, res, next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const today = new Date()
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId);
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    }

    const existingStartDate = new Date(booking.startDate);
    const existingEndDate = new Date(booking.endDate);

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
        await booking.update({
            startDate, endDate
        })

        return res.json(booking)
    }
})

router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const today = new Date();
    const booking = await Booking.findByPk(bookingId);

    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    } else {
        const spot = await Spot.findByPk(booking.spotId)
        if(booking.userId === userId || spot.ownerId === userId){
            if(new Date(booking.startDate) < today){
                return res.status(403).json({message: "Bookings that have started can't be deleted"})
            } else {
                await booking.destroy();
                return res.json({message: "Successfully deleted"})
            }
        } else{
            return res.status(403).json({message: "Forbidden"})
        }
    }
})

module.exports = router

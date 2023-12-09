const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");
const { Op } = require('sequelize');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateQuery = [
    check("page")
        .optional()
        .isFloat({min: 1})
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional()
        .isFloat({min: 1})
        .withMessage("Size must be greater than or equal to 1"),
    check("minLat")
        .isDecimal({min: -90})
        .optional()
        .custom(value => {
            if(value < -90){
                throw new Error("Minimum latitude is invalid")
            }
            return true;
        }),
    check("maxLat")
        .isDecimal({max: 90})
        .optional()
        .custom(value => {
            if(value > 90){
                throw new Error("Maximum latitude is invalid")
            }
            return true;
        }),
    check("minLng")
        .isDecimal({min: -180})
        .optional()
        .custom(value => {
            if(value < -180){
                throw new Error("Minimum longitude is invalid")
            }
            return true;
        }),
    check("maxLng")
        .isDecimal({max: 180})
        .optional()
        .custom(value => {
            if(value > 180){
                throw new Error("Maximum longitude is invalid")
            }
            return true;
        }),
    check("minPrice")
        .optional()
        .isDecimal()
        .custom(value => {
            if(value < 0){
                throw new Error("Minimum price must be greater than or equal to 0")
            }
            return true;
        }),
    check("maxPrice")
        .optional()
        .isDecimal()
        .custom(value => {
            if(value < 0){
                throw new Error("Maximum price must be greater than or equal to 0")
            }
            return true;
        }),
    handleValidationErrors,
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
    .isDecimal({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors,
]

router.get('/', validateQuery, async(req, res, next) => {
    const where = {};
    let query = { where }

    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if(minLat){
        where.lat = {[Op.gte]: minLat}
    }

    if(maxLat){
        where.lat = {[Op.lte]: maxLat}
    }

    if(minLat && maxLat){
        if(minLat > maxLat){
            const err = new Error("Bad Request")
            err.status = 400;
            err.errors = ["Min Lat cannot be greater than Max Lat"]
            next(err)
        } else{
            where.lat = {[Op.between]: [minLat, maxLat]}
        }
    }

    if(minLng){
        where.lng = {[Op.gte]: minLng}
    }

    if(maxLng){
        where.lng = {[Op.lte]: maxLng}
    }

    if(minLng && maxLng){
        if(minLng > maxLng){
            const err = new Error("Bad Request")
            err.status = 400;
            err.errors = ["Min Lng cannot be greater than Max Lng"]
            next(err)
        } else{
            where.lng = {[Op.between]: [minLng, maxLng]}
        }
    }

    if(minPrice){
        where.price = {[Op.gte]: minPrice}
    }

    if(maxPrice){
        where.price = {[Op.lte]: maxPrice}
    }

    if(minPrice && maxPrice){
        if(minPrice > maxPrice){
            const err = new Error("Bad Request")
            err.status = 400;
            err.errors = ["Min Price cannot be greater than Max Price"]
            next(err)
        } else{
            where.price = {[Op.between]:[minPrice, maxPrice]}
        }
    }

    const returnData = {}
    let spotsList = []

    let page;
    let size;

    if(req.query.size){
        size = req.query.size === undefined ? 20 : parseInt(req.query.size)
        if(size > 20) size = 20;
        query.limit = size;
    }

    if(req.query.page){
        page = req.query.page === undefined ? 1 : parseInt(req.query.page);
        if(page > 10) page = 10;
        query.offset = size * ( page - 1 )
    }

    query.include = [{ model: Review },{ model: Image }]

    const spots = await Spot.findAll(
        query
    )

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        let sum = 0
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
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

        if(spot.Images.length !== 0){
            spot.Images.forEach(image => {
                console.log(image)
                if(image.preview === true){
                    spot.previewImage = image.url
                } else{
                    spot.previewImage = "None provided"
                }
            })
        } else {
            spot.previewImage = "None provided"
        }

        delete spot.Images;
    })

    returnData.Spots = spotsList;
    returnData.page = page;
    returnData.size = size;

    return res.json(returnData)
})

router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id


    const returnData = {}
    let spotsList = []

    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: [{model: Review}, {model: Image}]
    })

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    })

    spotsList.forEach(spot => {
        let sum = 0
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
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

        if(spot.Images.length !== 0){
            spot.Images.forEach(image => {
                spot.previewImage = image.url
            })
        } else {
            spot.previewImage = "None provided"
        }

        delete spot.Images;
    })

    returnData.Spots = spotsList;

    return res.json(returnData)
})

router.get('/:spotId', async(req, res) => {
    const id = req.params.spotId;

    let returnData = {}
    let spotList = []

    const spot = await Spot.findOne({
        where:{id},
        include: [
            {model: Review},
            {
                model: Image,
                attributes: {exclude: ['imageableId', 'imageableType', 'createdAt', 'updatedAt']},
            },
            {
                model: User,
                attributes: {exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']}
            }
        ]
    })

    if(spot){
        spotList.push(spot.toJSON())

        spotList.forEach(spot => {
            spot.lat = Number(spot.lat)
            spot.lng = Number(spot.lng)
            spot.price = Number(spot.price)
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

router.get('/:spotId/bookings', requireAuth,  async(req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    const bookings = await Booking.findAll({
        where: {spotId: spot.id},
        include: {
            model: User,
            attributes: {exclude: ['username','createdAt', 'updatedAt', 'email', 'hashedPassword']}
        }
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
    let { address, city, state, country, lat, lng, name, description, price } = req.body
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

    spot.lat = Number(lat)
    spot.lng = Number(lng)
    spot.price = Number(price)

    return res.status(201).json(spot)
})

router.post('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }

    if(spot.ownerId === userId){
        return res.status(403).json({message: 'Forbidden'})
    }

    const existingBookings = await Booking.findAll({
        where:{spotId: spotId}
    })

    let conflict = false;

    existingBookings.forEach(existingBooking => {
        const existingStartDate = existingBooking.startDate.toISOString().split('T')[0]
        const existingEndDate = existingBooking.endDate.toISOString().split('T')[0]

        if(
            ((startDate > existingStartDate && startDate < existingEndDate) && (endDate > existingStartDate && endDate < existingEndDate)) ||
            (startDate < existingStartDate && endDate > existingEndDate) ||
            ((startDate === existingStartDate) && (endDate === existingEndDate))
        ){
            conflict = true;
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403;
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            next(err)
        } else if(
            startDate === existingStartDate ||
            startDate === existingEndDate ||
            (startDate >= existingStartDate && startDate <= existingEndDate)
        ){
            conflict = true;
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403;
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
            }
            next(err)
        } else if(
            endDate === existingStartDate ||
            endDate === existingEndDate ||
            (endDate >= existingStartDate && endDate <= existingEndDate)
        ){
            conflict = true;
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403;
            err.errors = {
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
    const userId = req.user.id;

    const { url, preview } = req.body;

    const spot = await Spot.findByPk(id)

    if(spot){
        if(spot.ownerId !== userId){
            return res.status(403).json({message: 'Forbidden'})
        } else{

            const image = await Image.create({
                url,
                preview,
                imageableId: id,
                imageableType: 'Spot'
            })

            const returnData = await Image.findByPk(image.id, {attributes:{exclude: ['imageableId', 'imageableType', 'createdAt', 'updatedAt']}})

            return res.json(returnData)
        }
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})

router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
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
    const userId = req.user.id

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(id)

    if(spot){
        if(spot.ownerId !== userId){
            return res.status(403).json({message: 'Forbidden'})
        } else {
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
        }
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})

router.delete('/:spotId', requireAuth, async(req, res) => {
    const id = req.params.spotId;
    const userId = req.user.id;
    const spot = await Spot.findByPk(id)

    if(spot){
        if(spot.ownerId === userId){
            await spot.destroy()
            return res.json({message: "Successfully deleted"})
        } else{
            return res.status(403).json({message: 'Forbidden'})
        }
    } else{
        return res.status(404).json({message: "Spot couldn't be found"})
    }
})


module.exports = router

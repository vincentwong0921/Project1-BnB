const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const imageId = req.params.imageId

    const image = await Image.findByPk(imageId);

    if(!image || image.imageableType !== 'Review'){
        return res.status(404).json({message: "Review Image couldn't be found"})
    } else {
        const reviewId = image.imageableId;
        const review = await Review.findByPk(reviewId);

        if(review.userId === userId){
            await image.destroy();
            return res.json({message: 'Successfully deleted'})
        } else {
            return res.status(403).json({message: "Forbidden"})
        }
    }
})

module.exports = router

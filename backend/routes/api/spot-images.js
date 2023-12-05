const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");

const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const image = await Image.findByPk(req.params.imageId);
    const userId = req.user.id;

    if(!image || image.imageableType !== 'Spot'){
        return res.status(404).json({message: "Spot Image couldn't be found"})
    } else{

        const spotId = image.imageableId;
        const spot = await Spot.findByPk(spotId)

        if(spot.ownerId === userId){
            await image.destroy();
            return res.json({message: 'Successfully deleted'})
        } else{
            return res.status(403).json({message: "Forbidden"})
        }
    }
})

module.exports = router

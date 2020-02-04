const Spot = require('../models/Spot')

module.exports = {
    async show(req, res){

        const spots = await Spot.find({ user : req.userId })
        if(!spots){
            return res.json({
                message : "None spot made until now"
            })
        }

        return res.json(spots)
    }
}
const Booking = require('../models/Booking')
const User = require('../models/User')
const Spot = require('../models/Spot')


module.exports = {
    async store(req, res){
        const { user_id, spot_id} = req.headers
        const { date } = req.body

        if(!await Spot.findById(spot_id) || !await User.findById(user_id)){
            return res.status(400)
        }

        let booking = Booking.find({user : user_id, spot : spot_id, date})

        if(!booking){
            return res.status(401)
        }

        booking = Booking.create({user : user_id, spot : spot_id, date})

        booking.populate('user').populate('spot').exec()

        return res.json(booking)
    }
}
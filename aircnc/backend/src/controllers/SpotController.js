const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const thumbnail = req.file.filename
        const { company, value, technologies } = req.body
        const { userId } = req

        if(!await User.findById(userId)){
            return res.status(401)
        }

        let spot = await Spot.findOne({ thumbnail, company, value, technologies, userId })
        if(!spot){
            spot = await Spot.create({ 
                thumbnail, 
                company, 
                value, 
                technologies: technologies.split(',').map(techs => techs.trim()),
                user : userId
            })
        }

        return res.json(spot)
    },
    
    async index(req, res){

        const { tech } = req.query

        const spots = await Spot.find({technologies : tech})

        if(!spots){
            return res.json({
                message : "Sorry, no matches."
            })
        }

        return res.json(spots)
    }
}

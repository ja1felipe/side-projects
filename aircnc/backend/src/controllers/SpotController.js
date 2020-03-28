const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const thumbnail = req.file.filename
        const { company, value } = req.body
        const { userId } = req
        let { technologies } = req.body
        technologies = technologies.split(',').map(techs => techs.trim())
        if(!await User.findById(userId)){
            return res.status(401)
        }

        let spot = await Spot.findOne({ company, value, technologies, user: userId })
        
        if(!spot){
            spot = await Spot.create({ 
                thumbnail, 
                company, 
                value, 
                technologies: technologies,
                user : userId
            })
            
            console.log("New spot create with sucess")
            return res.json(spot)
        }else{
            return res.status(400).json({message: 'New spot to similar to another of the same owner'})
        }
    },

    async update(req, res){
        const thumbnail = req.file.filename;
        const { company, value, spotId } = req.body;
        const { userId } = req;
        let { technologies } = req.body;
        technologies = technologies.split(',').map(techs => techs.trim())

        if(!await User.findById(userId)){
            return res.status(401)
        }

        let spot = await Spot.findById(spotId)

        if(spot){
            Spot.updateOne({_id : spotId}, { company, value, thumbnail, technologies })
            .then(() => {
                return res.status(200).json({ message: 'Spot updated with sucess.' })
            })
            .catch(err => {
                console.log('Spot update error', err)
            })
        }else{
            res.status(400).json({ message: 'Spot not found' })
        }
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
    },

    async delete(req, res){
        const { spotId } = req.params
        const userId = req.userId
        
        let spot = await Spot.findById(spotId)

        if(!spot){
            return res.status(404).json({
                message : "Sorry, no matches."
            })
        }

        if(spot.user != userId){
            return res.status(401).json({
                message : "You must be owner to delete a spot."
            })
        }

        await Spot.deleteOne({_id : spotId}).then(() => console.log(`Spot ${spot} deleted with sucess`)).catch(err => console.log('Error deleting spot ', err))

        return res.status(200).json({message: "Deleted with sucess"})
    }
}

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "sadknadksaweqweqw"

module.exports = {
    async store(req, res){
        const { email } = req.body
        const { password } = req.body

        let user = await User.findOne({ email })

        if(!user){
            user = await User.create({ email, password }).then(() => {
                console.log("New user create with sucess")
            }).catch(err => {
                console.log("Error creating user: ", err)
            })
        }
        
        return res.json(user)
    },

    async login(req, res){
        const { email } = req.body
        const { password } = req.body

        let user = await User.findOne({ email }).select('+password')
        if(!user){
            return res.status(400).send({error : "Invalid login"})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error : "Invalid password"})
        }

        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400
        })

        return res.send({user, token})
    }
}
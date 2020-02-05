const jwt = require('jsonwebtoken')
const secret = "sadknadksaweqweqw"

/**
 * Middleware using json web token responsable to authenticate the user
 */
module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).send({ message : "No token provided"})
    }

    const parts = authorization.split(' ')
    if(!parts.length === 2){
        return res.status(401).send({ message : "Bad format token"})
    }

    jwt.verify(parts[1], secret, (err, decoded) =>{
        if(err) return res.status(401).send({error : 'Token invalid'})

        req.userId = decoded.id

        return next()
    })
}
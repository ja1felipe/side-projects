const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const auth = require('./middleware/auth')

const sessionController = require('./controllers/SessionController')
const spotController = require('./controllers/SpotController')
const dashboardController = require('./controllers/DashboardController')

const router = express.Router()
const upload = multer(uploadConfig)

/**
 * Route responsable to register new users
 */
router.post('/register', sessionController.store)
/**
 * Route responsable to login the user and make the authentication
 */
router.post('/login', sessionController.login)

/**
 * Route responsable to create new spots
 */
router.post('/spots', [auth, upload.single('thumbnail')], spotController.store)
/**
 * /**
 * Route responsable to update spots
 */
router.put('/spots', [auth, upload.single('thumbnail')], spotController.update)
/**
 * Route responsable to list dependent of the technologie
 */
router.get('/spots', auth, spotController.index)
/**
 * Route responsable to delete a spot
 */
router.delete('/spots/:spotId', auth, spotController.delete)
/**
 * Route responsable to list all spots of one user
 */
router.get('/dashboard', auth, dashboardController.show)

module.exports = router

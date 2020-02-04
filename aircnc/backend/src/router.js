const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const auth = require('./middleware/auth')

const sessionController = require('./controllers/SessionController')
const spotController = require('./controllers/SpotController')
const dashboardController = require('./controllers/DashboardController')

const router = express.Router()
const upload = multer(uploadConfig)

router.post('/register', sessionController.store)
router.post('/login', sessionController.login)

router.post('/spots', [auth, upload.single('thumbnail')], spotController.store)
router.get('/spots', auth, spotController.index)
router.get('/dashboard', auth, dashboardController.show)

module.exports = router

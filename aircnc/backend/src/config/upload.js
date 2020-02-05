const multer = require('multer')
const path = require('path')

/**
 * Config of the multer, this is responsable to storage the image of a spot in the folder /thumbnails on the root of the project
 */
module.exports = {
    storage : multer.diskStorage({
        destination : path.resolve(__dirname, '..', '..', 'thumbnails'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext).trim().split(' ').join('-')

            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })
}
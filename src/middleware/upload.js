import multer from 'multer'
import config from '../config'

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.upload.folder)
  },
  filename: (req, file, cb, ) => {
    cb(null, `${req.filename}.${file.originalname.split('.')[1]}`)
  }
})

export default multer({ storage: storage, limits: { fileSize: config.upload.maxsize } })

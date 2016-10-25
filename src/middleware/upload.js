import multer from 'multer'
import config from '../config'
import crypto from 'crypto'

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.upload.folder)
  },
  filename: (req, file, cb, ) => {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(null, `${err ? undefined : raw.toString('hex')}.${file.originalname.split('.')[1]}`)
    })
  }
})

export default multer({ storage: storage, limits: { fileSize: config.upload.maxsize } })

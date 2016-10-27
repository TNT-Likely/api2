import Busboy from 'busboy'
import { handler } from '../tools'
import config from '../config'

export default (req, res, next) => {
  let fields = {},
    files = {}

  let busboy = new Busboy({ headers: req.headers })

  busboy.on('file', (fieldname, file) => {
    console.log(fieldname, file)
    files[fieldname] = file
  })

  busboy.on('field', (fieldname, val) => {
    console.log(fieldname, val)
    fields[fieldname] = val
  })

  busboy.on('finish', () => {
    req.upload = {
      fields: fields,
      files: files
    }
    next()
  })
}

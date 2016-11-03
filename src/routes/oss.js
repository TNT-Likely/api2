import { oss } from '../tools'
import { auth, upload2 } from '../middleware'
import co from 'co'
import path from 'path'
import express from 'express'

export default () => {
  let r = express.Router()

  let client = new oss('youths')

  r.post('/upload', upload2, (req, res) => {
    let file = req.upload.files['file']
    client.put(res, file)
  })

  return r
}

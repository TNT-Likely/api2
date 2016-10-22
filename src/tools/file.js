import fs from 'fs'
import path from 'path'
import config from '../config'
import handler from './handler'

export default (res, filename) => {
  let filepath = path.join(config.upload.folder, filename)
  res.sendFile(filepath)
}

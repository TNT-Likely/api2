import config from '../config'
import oss from 'ali-oss'
import co from 'co'
import path from 'path'
import fs from 'fs'
import handler from './handler'
import bson from 'bson'

class ossClient {
  constructor(bucket) {
    this.config = Object.assign(config.oss, { bucket: bucket })
    this.client = new oss(this.config)
  }

  fileinfo(filepath) {
    let file = fs.readFileSync(filepath)
    let ext = path.extname(filepath)
    return {
      objectkey: bson.ObjectId() + ext,
      file: file
    }
  }

  put(res, filepath) {
    let file = this.fileinfo(filepath)
    let self = this
    co(function*() {
      var result = yield self.client.put(file.objectkey, file.file);
      handler(res, result)
    }).catch(function(err) {
      handler(res, err, 40600)
    })
  }
}

export default ossClient

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

  objectkey(name) {
    return bson.ObjectId() + path.extname(name)
  }

  put(res, file) {
    let objectkey = this.objectkey(file.name)
    let self = this
    co(function*() {
      var result = yield self.client.put(objectkey, new Buffer(file.data));
      handler(res, result)
    }).catch(function(err) {
      handler(res, err, 40600)
    })
  }
}

export default ossClient

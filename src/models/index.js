import fs from 'fs'
import path from 'path'
import config from '../config'

fs
  .readdirSync(config.modelsFolder)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = require(path.join(config.modelsFolder, file))
    let modelName = file.toString().split('.')[0]
    module.exports[modelName] = model
  })

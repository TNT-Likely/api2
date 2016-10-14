import fs from 'fs'
import path from 'path'
import config from '../config'

let models = []

fs
  .readdirSync(config.modelsFolder)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = require(path.join(config.modelsFolder, file)).default
    let modelName = file.toString().split('.')[0]
    models[modelName] = model
  })
  
export default models

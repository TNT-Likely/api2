import fs from 'fs'
import path from 'path'
import sailsMongoAdapter from 'sails-mongo'
import Waterline from 'waterline'
import config from '../config'

let orm = new Waterline()

let waterlineConfig = {
  adapters: {
    'mongo': sailsMongoAdapter
  },
  connections: {
    default: Object.assign({
      adapter: 'mongo'
    }, config.db)
  }
}

fs
  .readdirSync(config.modelsFolder)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = require(path.join(config.modelsFolder, file)).default
    orm.loadCollection(Waterline.Collection.extend(model))
  });

export default { waterline: orm, config: waterlineConfig }

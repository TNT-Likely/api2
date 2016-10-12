import config from '../config'
import jsonfile from 'jsonfile'
import path from 'path'
import fs from 'fs'

export default function() {
  return new Promise((resolve, reject) => {
    let models = []
    fs.readdir(config.modelsFolder, (err, files) => {
      if (err) reject(err)
      files.forEach((i) => {
        if (path.extname(i) == '.json') {
          models.push(jsonfile.readFileSync(`${config.modelsFolder}/${i}`))
        }
        resolve(models)
      })
    })
  })
}

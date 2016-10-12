import express from 'express'
import color from 'colors'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from './config'
import models from './models'

const app = express()

//parser body
app.use(bodyParser())

//parse cookie
app.use(cookieParser())

//server static file
app.use('/static', express.static(config.staticFolder))

//init database
models.waterline.initialize(models.config, function(err, models) {
  if (err) throw err
 
  app.models = models.collections
  app.connections = models.connections

  //start server
  app.listen(config.port, () => {
    console.log(`start server at port ${config.port} success`.blue)
  })
})

export default app

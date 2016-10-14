import express from 'express'
import color from 'colors'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import config from './config'
import models from './models'
import { restRouter } from './routes'

mongoose.connect(config.mongo.url)
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1);
})

models['user'].create({ username: 'xxx', password: 'sunxiao=195721..', email: 'aa.cc@youths.cc', phone: '1' }, (err, result) => {
  console.log(err, result)
})

const app = express()

//parser body
app.use(bodyParser())

//parse cookie
app.use(cookieParser())

//server static file
app.use('/static', express.static(config.staticFolder))

//rest router
app.use(`/${config.restEndpoint}`, restRouter())

//start server
app.listen(config.port, () => {
  console.log(`start server at port ${config.port} success`.blue)
})


export default app

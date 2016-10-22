import express from 'express'
import color from 'colors'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config'
import models from './models'
import { restRouter } from './routes'

mongoose.connect(config.mongo.url)
mongoose.Promise = global.Promise
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1);
})

const app = express()

//parser body
app.use(bodyParser())

//parse cookie
app.use(cookieParser())

//logger middleware
if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'))
}

//server static file
app.use('/static', express.static(config.staticFolder))

//rest router
app.use(`/${config.restEndpoint}`, restRouter())

//catch 404
app.use((req, res, next) => {
    next('not found!')
});

//error handler
app.use((err, req, res, next) => {
    res.status(404).send(err);
})

//start server
app.listen(config.port, () => {
    console.log(`start server at port ${config.port} success`.blue)
})


export default app

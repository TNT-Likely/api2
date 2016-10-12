import express from 'express'
import color from 'colors'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from './config'

const app = express()

//parser body
app.use(bodyParser())

//parse cookie
app.use(cookieParser())

//server static file
app.use('/static', express.static(path.join(__dirname, config.staticFolder)))

//start server
app.listen(config.port, () => {
  console.log(`start server at port ${config.port} success`.blue)
})

export default app

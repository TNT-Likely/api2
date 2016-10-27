import express from 'express'
import config from '../config'

export default () => {
  let router = express.Router()

  //rest router 
  router.use(`/${config.restEndpoint}`, require('./rest')(router))

  //oss router
  router.use(`/oss`, require('./oss')(router))
  return router
}

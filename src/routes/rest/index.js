import express from 'express'
import models from '../../models'
import { handler } from '../../tools'

export default (app) => {
  let router = express.Router()
  let model = null

  //user路由
  require('./user')(router)

  //file路由
  require('./file')(router)

  return router
}

import express from 'express'
import models from '../../models'
import { handler } from '../../tools'

export let restRouter = (app) => {
  let router = express.Router()
  let model = null

  //user路由
  require('./user')(router)

  return router
}

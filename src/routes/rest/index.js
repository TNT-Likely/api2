import express from 'express'

export default () => {
  let r = express.Router()

  //user路由
  require('./user')(r)

  //file路由
  require('./file')(r)

  return r
}

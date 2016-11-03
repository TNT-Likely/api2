import express from 'express'

export default () => {
  let r = express.Router()

  //user路由
  r.use('/user', require('./user')())

  //file路由
  r.use('/file', require('./file')())

  return r
}

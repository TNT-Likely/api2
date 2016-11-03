import { fetch, handler } from '../tools'
import express from 'express'

let f = new fetch('http://stats.nba.com/')

export default () => {
  let r = express.Router()
  r.use('/', (req, res) => {
    let url = req.originalUrl.replace('/nba/', '')
    f.send(res, url).then(r => {
      handler(res, r)
    })
  })

  return r
}

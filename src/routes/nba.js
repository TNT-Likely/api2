import { fetch, handler } from '../tools'

let f = new fetch('http://stats.nba.com/')

export default (router) => {

  router.use('/data', (req, res) => {
    let url = req.originalUrl.replace('/nba/data', '')
    f.send(res, url).then(r => {
      handler(res, r)
    })
  })

  return router
}

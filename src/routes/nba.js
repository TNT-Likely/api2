import { fetch, handler } from '../tools'

let f = new fetch('http://stats.nba.com/')

export default (router) => {

  router.use('/', (req, res) => {
    let url = req.originalUrl.replace('/nba/', '')
    f.g(res, url).then(r => {
      handler(res, r)
    })
  })

  return router
}

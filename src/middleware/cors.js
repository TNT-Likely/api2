import config from '../config'

export default (req, res, next) => {
  // Website you wish to allow to connect
  res.set('Access-Control-Allow-Origin', config.allowHosts)

  // Request methods you wish to allow
  // res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.set('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
}

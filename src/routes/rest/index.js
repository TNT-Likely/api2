export default (router) => {

  //user路由
  require('./user')(router)

  //file路由
  require('./file')(router)

  return router
}

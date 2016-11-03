import config from '../config'

export default (app) => {
  //rest router 
  app.use(`/${config.restEndpoint}`, require('./rest')())

  //oss router
  app.use(`/oss`, require('./oss')())

  //captcha router
  app.use(`/captcha`, require('./captcha')())


}

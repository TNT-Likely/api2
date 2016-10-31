import { captcha, handler, crypto } from '../tools'

export let validate = (req, res, next) => {
  let is = crypto.validate(req.body.captcha, req.body.token)
  if (is) next()
  else handler(res, '验证码错误', 40607)
}

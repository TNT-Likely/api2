import cookieModel from '../models/cookie'
import userModel from '../models/user'
import { handler } from '../tools'

export let auth = (req, res, next) => {
  let accessToken = req.cookies.accessToken
  if (!accessToken) {
    handler(res, '未登录', 4100)
  } else {
    cookieModel.findOne({ accessToken: accessToken }).populate('uid').select('uid createdAt ttl').then(r => {
      if (!r) {
        handler(res, 'cookie不存在', 4101)
      } else if (typeof Date.parse(r.createdAt) != 'number' || typeof r.ttl != 'number') {
        handler(res, 'cookie信息错误', 4103)
      } else if (Date.parse(new Date()) > Date.parse(r.createdAt) + r.ttl) {
        handler(res, 'cookie已过期', 4102)
      } else {
        req.user = {
          id: r.uid.id,
          username: r.uid.username,
          email: r.uid.email,
          phone: r.uid.phone,
          emailVerified: r.uid.emailVerified
        }
        next()
      }
    }).catch(e => {
      handler(res, '未登录', 4100)
    })
  }
}

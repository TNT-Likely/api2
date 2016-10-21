let model = require('../../models')['user']
let cookieModel = require('../../models')['cookie']
import bcrypt from 'bcryptjs'
import { handler, uid, emailsender } from '../../tools'
import { auth, check } from '../../middleware'

export default (r) => {

  //注册
  r.post('/user/register', check(['username', 'password', 'email']), (req, res) => {
    model.create(req.body).then(result => {
      result.verifyToken = uid()
      result.save().then(r => {
        emailsender.verify(r.email, r.verifyToken).then(result => {
          handler(res, r)
        }).catch((err) => {
          handler(res, err, 4000)
        })
      }).catch(err => {
        handler(res, err, 4001)
      })
    }).catch(err => {
      handler(res, err, 4002)
    })
  })

  //激活
  r.post('/user/verify', (req, res) => {

  })

  //登录
  r.post('/user/login', check(['nameOrEmail', 'password']), (req, res) => {
    let nameOrEmail = req.body.nameOrEmail
    let password = req.body.password

    model.findOne().or([{ username: nameOrEmail }, { email: nameOrEmail }]).then(r => {
      if (!r) handler(res, '用户不存在', 4003)
      if (!r.emailVerified) {
        handler(res, '邮箱未激活', 4004)
      } else if (bcrypt.compareSync(password, r.password)) {
        cookieModel.create({ uid: r.id }).then(rs => {
          r._doc.accessToken = rs.accessToken
          handler(res, r._doc)
        }).catch(er => {
          handler(res, er, 4005)
        })
      } else {
        handler(res, '密码错误', 4006)
      }
    }).catch(e => {
      handler(res, e, 4007)
    })
  })

  //用户状态
  r.get('/user/status', auth, (req, res) => {
    handler(res, req.user)
  })
}

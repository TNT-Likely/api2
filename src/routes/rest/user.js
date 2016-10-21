let model = require('../../models')['user']
let cookieModel = require('../../models')['cookie']
import bcrypt from 'bcryptjs'
import { handler, uid, emailsender, regex } from '../../tools'
import { auth, check } from '../../middleware'

export default (r) => {

  //注册
  r.post('/user/register', check(['username', { key: 'password', match: regex.phone }, 'email']), (req, res) => {
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
  r.post('/user/verify', check(['uid', 'token']), (req, res) => {
    model.findOne({ _id: req.body.uid, verifyToken: req.body.token }).then(r => {
      if (!r) {
        handler(res, '无效uid或token', 4010)
      } else {
        r.emailVerified = true
        r.verifyToken = undefined
        r.save().then(re => {
          handler(res, '激活成功')
        }).catch(er => {
          handler(res, '激活失败', 4011)
        })
      }
    }).catch(e => {
      handler(res, e, 4009)
    })
  })

  //重置邮件
  r.post('/user/reset', check(['email']), (req, res) => {
    let email = req.body.email
    model.findOne({ email: email }).then(r => {
      r.resetToken = uid()
      r.save().then(re => {
        emailsender.reset({ email: email, token: re.resetToken }).then(res => {
          handler(res, '激活邮件发送成功')
        }).catch(err => {
          handler(res, err, 4014)
        })
      }).catch(er => {
        handler(res, er, 4013)
      })
    }).catch(e => {
      handler(res, e, 4012)
    })
  })

  //重置密码
  r.post('/user/reset/verify', check(['uid', 'token', { key: 'password', match: regex.phone }]), (req, res) => {
    model.findOne({ resetToken: req.body.token }).then(r => {
      if (!r) {
        handler(res, 'token不存在', 4016)
      } else if (r.id != req.body.uid) {
        handler(res, 'token无效', 4017)
      } else {

      }
    }).catch(e => {
      handler(res, e, 4015)
    })
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
        cookieModel.findOneAndUpdate({ uid: r.id }, { ttl: 0 }).then(resu => { //旧cookie设置过期
          cookieModel.create({ uid: r.id }).then(rs => { //生成新cookie
            r._doc.accessToken = rs.accessToken
            handler(res, r._doc)
          }).catch(er => {
            handler(res, er, 4005)
          })
        }).catch(err => {
          handler(res, err, 4008)
        })

      } else {
        handler(res, '密码错误', 4006)
      }
    }).catch(e => {
      handler(res, e, 4007)
    })
  })

  //注销

  //用户状态
  r.get('/user/status', auth, (req, res) => {
    handler(res, req.user)
  })
}

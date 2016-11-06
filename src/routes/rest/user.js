import { user, cookie } from '../../models'
import bcrypt from 'bcryptjs'
import { handler, uid, emailsender, regex } from '../../tools'
import { auth, check, captcha } from '../../middleware'
import express from 'express'

export default () => {
  let r = express.Router()

  //注册
  r.post('/register', check(['username', { key: 'password', match: regex.password }, 'email', 'vcode', 'token']), captcha.validate, (req, res) => {
    user.create(req.body).then(result => {
      result.verifyToken = uid()
      result.save().then(r => {
        emailsender.verify(r.email, r.verifyToken, r.id).then(result => {
          handler(res, r)
        }).catch((err) => {
          handler(res, err, 40000)
        })
      }).catch(err => {
        handler(res, err, 40001)
      })
    }).catch(err => {
      handler(res, err, 40002)
    })
  })

  //激活
  r.post('/verify', check(['uid', 'token']), (req, res) => {
    user.findOne({ _id: req.body.uid, verifyToken: req.body.token }).then(r => {
      if (!r) {
        handler(res, '无效uid或token', 40010)
      } else {
        r.emailVerified = true
        r.verifyToken = undefined
        r.save().then(re => {
          handler(res, '激活成功')
        }).catch(er => {
          handler(res, '激活失败', 40011)
        })
      }
    }).catch(e => {
      handler(res, e, 40009)
    })
  })

  //重置邮件
  r.post('/reset', check(['email']), (req, res) => {
    let email = req.body.email
    user.findOne({ email: email }).then(r => {
      if (!r) {
        handler(res, '用户不存在', 40003)
      } else if (!r.emailVerified) {
        handler(res, '邮箱未激活', 40004)
      } else {
        r.resetToken = uid()
        r.save().then(re => {
          emailsender.reset(email, re.resetToken, r.id).then((resu) => {
            handler(res, '激活邮件发送成功')
          }).catch(err => {
            handler(res, err, 40014)
          })
        }).catch(er => {
          handler(res, er, 40013)
        })
      }
    }).catch(e => {
      handler(res, e, 40012)
    })
  })

  //重置密码
  r.post('/reset/verify', check(['uid', 'token', { key: 'password', match: regex.password }]), (req, res) => {
    user.findOne({ resetToken: req.body.token }).then(r => {
      if (!r) {
        handler(res, 'token不存在', 40016)
      } else if (r.id != req.body.uid) {
        handler(res, 'token无效', 40017)
      } else {
        user.update({ password: req.body.password }).then(r => {
          handler(res, '更新成功')
        }).catch(e => {
          handler(res, '更新密码失败', 40018)
        })
      }
    }).catch(e => {
      handler(res, e, 40015)
    })
  })

  //登录
  r.post('/login', check(['nameOrEmail', 'password']), (req, res) => {
    let nameOrEmail = req.body.nameOrEmail
    let password = req.body.password

    user.findOne().or([{ username: nameOrEmail }, { email: nameOrEmail }]).then(r => {
      if (!r) handler(res, '用户不存在', 40003)
      if (!r.emailVerified) {
        handler(res, '邮箱未激活', 40004)
      } else if (bcrypt.compareSync(password, r.password)) {
        cookie.findOneAndUpdate({ uid: r.id }, { ttl: 0 }, { sort: { createdAt: 'desc' } }).then(resu => { //旧cookie设置过期
          cookie.create({ uid: r.id }).then(rs => { //生成新cookie
            r._doc.accessToken = rs.accessToken
            handler(res, r._doc)
          }).catch(er => {
            handler(res, er, 40005)
          })
        }).catch(err => {
          handler(res, err, 40008)
        })

      } else {
        handler(res, '密码错误', 40006)
      }
    }).catch(e => {
      handler(res, e, 40007)
    })
  })

  //注销
  r.get('/logout', auth, (req, res) => {
    cookie.findOneAndUpdate({ uid: req.user.id }, { ttl: 0 }, { sort: { createdAt: 'desc' } }).then(r => {
      handler(res, '注销成功')
    }).catch(e => {
      handler(res, e, 40019)
    })
  })

  //用户状态
  r.get('/status', auth, (req, res) => {
    handler(res, req.user)
  })

  //检查用户名、邮箱是否已被使用
  r.post('/exist', check(['key', 'value']), (req, res) => {
    let key = req.body.key
    let value = req.body.value
    let opt = {}
    opt[key] = value
    user.findOne(opt).then(r => {
      if (!r) handler(res, `${key}的值${value}可用`)
      else handler(res, `${key}的值${value}不可用`, 40052)
    }).catch(e => {
      handler(res, e, 40051)
    })
  })
  return r
}

import nodemailer from 'nodemailer'
import config from '../config'

class email {
  constructor(serverConfig) {
    this.serverConfig = serverConfig
    this.transporter = nodemailer.createTransport(serverConfig)
  }

  sendAction(handler) {
    this.transporter.sendMail(this.mailConfig, (err, info) => {
      handler(err, info)
    })
  }

  send(mailConfig, callback) {
    this.mailConfig = mailConfig

    return new Promise((resolve, reject) => {
      this.sendAction((err, info) => {
        if (!!err) {
          reject(err)
        } else {
          resolve(info)
        }
      })
    })
  }

  //163 mail deny email's from field not equal emailserver's user 
  send163(mailConfig) {
    return this.send(Object.assign(mailConfig, { from: this.serverConfig.auth.user }))
  }

  //注册激活邮件
  verify(email, token) {
    return this.send163({
      subject: '激活邮箱',
      to: email,
      html: `请点击<a href="${token}">这里</a>验证邮箱`
    })
  }
}

export let emailsender = new email(config.email)

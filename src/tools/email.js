import nodemailer from 'nodemailer'
import config from '../config'
import path from 'path'

let EmailTemplate = require('email-templates').EmailTemplate

class email {
  constructor(serverConfig) {
    this.serverConfig = serverConfig
    this.transporter = nodemailer.createTransport(serverConfig)
    this.from = `youths网 <${this.serverConfig.auth.user}>`
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
    return this.send(Object.assign(mailConfig, { from: this.from }))
  }

  //use template
  template(templateDir, mailConfig, templateData) {
    let send = this.transporter.templateSender(new EmailTemplate(path.join(__dirname, templateDir)), {
      from: this.from
    })

    return send(mailConfig, templateData)
  }

  //注册激活邮件
  verify(email, token) {
    return this.template('../static/tpl/verify', {
      subject: '请激活您的youths网账号',
      to: email
    }, { email: email, token: token })
  }

  //重置密码邮件
  reset(email, token) {
    return this.template('../static/tpl/reset', {
      subject: 'youths网重置密码',
      to: email
    }, { email: email, token: token })
  }
}

export default new email(config.email)

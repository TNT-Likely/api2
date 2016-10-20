import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { uid } from '../tools'

let Schema = new mongoose.Schema({
  username: { type: String, required: true, max: 20, unique: true },
  password: { type: String, required: true },
  //手机验证
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /1\d{10}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    unique: true
  },
  //邮箱验证
  email: { type: String, required: true, unique: true, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
  //邮箱是否激活
  emailVerified: { type: Boolean, default: false },
  //激活token
  verifyToken: String,
  //重置密码token
  resetToken: String,
  avatar: String
}, { versionKey: '', timestamps: {} })

//密码存入之前要加密
Schema.post('save', (m, next) => {
  m.password = bcrypt.hashSync(m.password, 10)
  next()
})

//登录
Schema.statics.login = (nameOrEmail, password, next) => {
  return new Promise((resolve, reject) => {
    model.findOne().or([{ username: nameOrEmail }, { email: nameOrEmail }]).then((r) => {
      if (!r) resolve({ msg: '用户不存在' });
      if (bcrypt.compareSync(password, r.password)) {
        resolve(r)
      } else {
        resolve({ msg: '密码错误' })
      }
    }).catch(e => {
      reject(e)
    })
  })
}

Schema.plugin(require('mongoose-unique-validator'))

let model = mongoose.model('user', Schema)

export default model

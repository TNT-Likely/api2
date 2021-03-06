import mongoose from 'mongoose'
import { uid, crypto } from '../tools'

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
  //可用金额
  amount: { type: Number, default: 0.00 },
  avatar: String
}, { versionKey: '', timestamps: {} })

//密码存入之前要加密
Schema.post('save', (m, next) => {
  m.password = crypto.encrypt(m.password, 10)
  next()
})

Schema.plugin(require('mongoose-unique-validator'))

export default mongoose.model('user', Schema)

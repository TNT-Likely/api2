import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

Schema.post('save', (m, next) => {
  m.password = bcrypt.hashSync(m.password, 10)
  next()
})

Schema.plugin(require('mongoose-unique-validator'))

export default mongoose.model('user', Schema)

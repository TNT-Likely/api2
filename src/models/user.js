import mongoose from 'mongoose'

let Schema = new mongoose.Schema({
  username: { type: String, required: true, max: 20 },
  password: { type: String, required: true, match: /^\S{6,16}$/ },
  //手机验证
  phone: { type: String, macth: /^1[0-9]{10}$/ },
  //邮箱验证
  email: { type: String, match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
  //邮箱是否激活
  emailVerified: Boolean,
  //激活token
  verifyToken: String,
  //重置密码token
  resetToken: String,
  avatar: String
}, { versionKey: '', timestamps: {} })

export default mongoose.model('user', Schema)

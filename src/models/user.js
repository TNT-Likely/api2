import mongoose from 'mongoose'

export default mongoose.model('user', {
  username: String,
  password: String,
  email: String,
  emailVerified: Boolean,
  created: String,
  modified: String,
  avatar: String
})

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { uid } from '../tools'

let Schema = new mongoose.Schema({
  uid: { type: String, required: true },
  ttl: { type: Number, default: 604800000 },
  accessToken: { type: String, unique: true },
}, { versionKey: '', timestamps: {} })

Schema.post('save', (m, next) => {
  m.accessToken = uid()
  next()
})

Schema.plugin(require('mongoose-unique-validator'))

let model = mongoose.model('cookie', Schema)

export default model

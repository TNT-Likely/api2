import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { uid } from '../tools'

let Schema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
  ttl: { type: Number, default: 604800000 },
  accessToken: { type: String, default: uid, unique: true },
}, { versionKey: '', timestamps: {} })

Schema.plugin(require('mongoose-unique-validator'))

let model = mongoose.model('cookie', Schema)

export default model

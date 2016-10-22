import mongoose from 'mongoose'

let Schema = new mongoose.Schema({
  name: { type: String },
  uid: { type: mongoose.Schema.Types.ObjectId, require: true }, //upload userid
  level: { type: Number, default: 0 }, //0 everyone //1 authentication user //2 only himself 
}, { versionKey: '', timestamps: {} })

Schema.plugin(require('mongoose-unique-validator'))

let model = mongoose.model('file', Schema)

export default model

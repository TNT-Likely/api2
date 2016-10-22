import path from 'path'

export default {
  port: 3030,
  staticFolder: path.join(__dirname, '../static'),
  modelsFolder: path.join(__dirname, '../models'),
  upload: {
    folder: path.join(__dirname, '../../.tmp'),
    maxsize: 1024 * 1024
  },
  restEndpoint: 'rest',
  mongo: {
    url: 'mongodb://localhost/youths'
  },
  email: {
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: 'admin@youths.cc',
      pass: 'SUNxiao195721'
    }
  }
}

import path from 'path'

export default {
  port: 3030,
  staticFolder: path.join(__dirname, '../static'),
  modelsFolder: path.join(__dirname, '../models'),
  restEndpoint: 'rest',
  mongo: {
    url: 'mongodb://localhost/youths'
  },
  db: {
    host: '127.0.0.1',
    port: 27017,
    database: 'youths',
    user: '',
    password: ''
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

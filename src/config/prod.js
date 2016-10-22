import path from 'path'

export default {
  port: 4000,
  staticFolder: path.join(__dirname, '../static'),
  modelsFolder: path.join(__dirname, '../models'),
  upload: {
    folder: '/dsik/upload',
    maxsize: 1024 * 1024
  },
  restEndpoint: 'rest',
  mongo: {
    url: 'mongodb://localhost/youths'
  },
  email: {
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: 'youthschina@163.com',
      pass: 'uFS7KIPzmMBfoXk4'
    }
  }
}

import path from 'path'

export default {
  port: 4000,
  staticFolder: path.join(__dirname, '../static'),
  modelsFolder: path.join(__dirname, '../models'),
  allowHosts: ['*.youths.cc'],
  upload: {
    folder: '/dsik/upload',
    maxsize: 1024 * 1024,
    maxfiles: 3,
    maxfields: 7
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
  },
  oss: {
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAItpYmqinO0cvZ',
    accessKeySecret: 'Bf7VpuelfI3PrkBzePS8xeDbWY506q',
  }
}

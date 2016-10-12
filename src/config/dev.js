import path from 'path'

export default {
  port: 3030,
  staticFolder: path.join(__dirname, '../static'),
  modelsFolder: path.join(__dirname, '../models'),
  db: {
    host: '127.0.0.1',
    port: 27017,
    database: 'api',
    user: '',
    password: ''
  }
}

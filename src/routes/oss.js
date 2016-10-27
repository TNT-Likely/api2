import { oss } from '../tools'
import { auth, upload2 } from '../middleware'
import co from 'co'
import path from 'path'

export default (r) => {
  let client = new oss('youths')

  r.post('/upload', upload2, (req, res) => {
    console.log(req.upload.files)
    client.put(res, path.join(__dirname, './index.js'))
  })

  return r
}

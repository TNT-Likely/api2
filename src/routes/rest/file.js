import fs from 'fs'
import { user, file } from '../../models'
import { handler, file as fileTool } from '../../tools'
import { auth, check, upload } from '../../middleware'

export default (r) => {
  //上传单个文件
  r.post('/file/upload', auth, (req, res) => {
    let entity = {
      uid: req.user.id,
      // uid: '5808e2a1eda9fe2240058e08e',
      level: req.body.level || undefined,
      name: req.body.name || undefined
    }

    let cpupload = upload.single('file')

    file.create(entity).then(r => {
      req.filename = entity.name || r.id
      cpupload(req, res, er => {
        if (er) handler(res, er, 40031);
        else {
          r.name = req.file.filename
          r.save().then(re => {
            handler(res, { id: r.id })
          }).catch(err => {
            handler(res, err, 40032)
          })
        }
      })
    }).catch(e => {
      handler(res, e, 40030)
    })
  })

  //读取文件
  r.get('/file/:id', (req, res, next) => {
    file.findOne({ _id: req.params.id }).then(r => {
      if (r.level == '0') {
        fileTool(res, r.name)
      } else {
        req.file = r
        next()
      }
    }).catch(e => {
      handler(res, e, 40033)
    })
  }, auth, (req, res) => {
    if (req.file.level == '1') {
      fileTool(res, req.file.name)
    }
    if (req.user.id != req.file.uid) {
      handler(res, '无访问权限', 40034)
    }
    fileTool(res, req.file.name)
  })
}

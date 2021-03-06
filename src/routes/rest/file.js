import fs from 'fs'
import { user, file } from '../../models'
import { handler, file as fileTool } from '../../tools'
import { auth, check, upload } from '../../middleware'
import express from 'express'

export default () => {
  let r = express.Router()

  //上传单个文件(options{level:安全等级})
  r.post('/upload', auth, upload.single('file'), (req, res) => {
    let entity = {
      uid: req.user.id,
      level: req.body.level || undefined,
      name: req.file.filename || undefined
    }

    file.create(entity).then(r => {
      handler(res, { id: r.id })
    }).catch(e => {
      handler(res, e, 40030)
    })
  })

  //读取文件
  r.get('/:id', (req, res, next) => {
    file.findOne({ _id: req.params.id }).then(r => {
      if (!r) {
        handler(res, '文件不存在', 40036)
      } else if (r.level == '0') {
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
    } else if (req.user.id != req.file.uid) {
      handler(res, '无访问权限', 40034)
    } else {
      fileTool(res, req.file.name)
    }
  })

  return r
}

import Busboy from 'busboy'
import fs from 'fs'
import { handler } from '../tools'
import config from '../config'

export default (req, res, next) => {
  let fields = {},
    files = {}

  //退出busboy
  let abortWithCode = (code, msg) => {
    req.unpipe(busboy) //终结busboy
    handler(res, msg, code) //返回错误
  }

  let busboy = new Busboy({
    headers: req.headers, //根据headers获取上传文件
    limits: {
      files: config.upload.maxfiles, //上传文件最多数
      fileSize: config.upload.maxsize, //上传文件最大大小
      fields: config.upload.maxfields //上传非文件最大字段数
    }
  })

  //文件接受事件
  busboy.on('file', (fieldname, file, filename) => {
    //必备file event,否则无法接受文件
    let data = []
    file.on('data', (chunk) => {
      data.push(chunk)
    })
    file.on('end', () => {
      if (file.truncated) return; //文件是否超出事件限制标示
      files[fieldname] = { data: Buffer.concat(data), name: filename }
    })
  })

  //超出文件限制事件
  busboy.on('filesLimit', () => {
    abortWithCode(40605, `最多上传${config.upload.maxfiles}个文件,每个文件最大${config.upload.maxsize/1024/1024}MB`)
  })

  //超出文本字段限制
  busboy.on('fieldsLimit', () => {
    abortWithCode(40606, `最多${config.upload.maxfields}个非文件字段`)
  })

  //接受文本字段事件
  busboy.on('field', (fieldname, val) => {
    fields[fieldname] = val
  })

  //接受错误
  busboy.on('error', () => {
    abortWithCode(40603, '接收文件出错')
  })

  //接受完成事件
  busboy.on('finish', () => {
    req.upload = {
      fields: fields,
      files: files
    }
    next()
  })

  //必备(否则无法接受finish)
  req.pipe(busboy)
}

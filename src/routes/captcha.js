import { auth, check, captcha as m_captcha } from '../middleware'
import { captcha, crypto, handler } from '../tools'
import Canvas from 'canvas'
import path from 'path'
import express from 'express'

export default () => {
  let r = express.Router()

  r.get('/new', (req, res) => {
    let Image = Canvas.Image,
      canvas = new Canvas(100, 40),
      ctx = canvas.getContext('2d'),
      text = captcha.text()

    ctx.font = '30px Impact'
    ctx.rotate(-.1)
    ctx.fillText(text, 10, 35)
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'

    let img = canvas.toBuffer()
    res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length, 'token': crypto.encrypt(text) })
    res.end(canvas.toBuffer())
  })

  r.post('/validate', check(['captcha', 'token']), m_captcha.validate, (req, res) => {
    handler(res, '验证码正确')
  })

  return r
}

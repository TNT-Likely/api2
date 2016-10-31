import { auth, check } from '../middleware'
import { captcha, crypto, handler } from '../tools'
import Canvas from 'canvas'
import path from 'path'

export default (r) => {
  r.get('/new', (req, res) => {
    let Image = Canvas.Image,
      canvas = new Canvas(200, 80),
      ctx = canvas.getContext('2d'),
      text = captcha.text()


    ctx.font = '30px Impact';
    ctx.rotate(-.1);
    ctx.fillText(text, 50, 50);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.stroke()

    let img = canvas.toBuffer()
    res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length, 'token': crypto.encrypt(text) })
    res.end(canvas.toBuffer())
  })

  r.post('/validate', check(['captcha', 'token']), (req, res) => {
    let is = crypto.validate(req.body.captcha, req.body.token)
    if (is) handler(res, '验证码正确')
    else handler(res, '验证码错误', 40607)
  })

  return r
}

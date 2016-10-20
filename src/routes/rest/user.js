let model = require('../../models')['user']
import { handler, uid, emailsender } from '../../tools'

export default (r) => {
  r.post('/user/register', (req, res) => {
    let body = req.body
    model.create(body).then(result => {
      result.verifyToken = uid()
      result.save().then(r => {
        emailsender.verify(r.email, r.verifyToken).then(result => {
          res.json(r)
        }).catch((err) => {
          res.json(err)
        })
      }).catch(err => {
        res.json(err)
      })
    }).catch(err => {
      res.json(err)
    })
  })

  r.post('/user/login', (req, res) => {
    model.login(req.body.nameOrEmail, req.body.password).then(r => {
      res.json(r)
    }).catch(e => {
      res.json(e)
    })
  })
}

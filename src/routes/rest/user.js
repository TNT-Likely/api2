let model = require('../../models')['user']
import { handler, uid, emailsender } from '../../tools'

export default (r) => {
  r.post('/user/register', async(req, res) => {
    let body = req.body
    await model.create(body).then(result => {
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
}

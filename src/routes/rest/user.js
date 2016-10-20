let model = require('../../models')['user']
let cookieModel = require('../../models')['cookie']
import bcrypt from 'bcryptjs'
import { handler, uid, emailsender } from '../../tools'

export default (r) => {
    r.post('/user/register', (req, res) => {
        let body = req.body
        model.create(body).then(result => {
            result.verifyToken = uid()
            result.save().then(r => {
                emailsender.verify(r.email, r.verifyToken).then(result => {
                    handler(res, r)
                }).catch((err) => {
                    handler(res, err, 4000)
                })
            }).catch(err => {
                handler(res, err, 4001)
            })
        }).catch(err => {
            handler(res, err, 4002)
        })
    })

    r.post('/user/login', (req, res) => {
        let nameOrEmail = req.body.nameOrEmail
        let password = req.body.password
        model.findOne().or([{ username: nameOrEmail }, { email: nameOrEmail }]).then((r) => {
            if (!r) handler(res, '用户不存在', 4003)
            if (!r.emailVerified) {
                handler(res, '邮箱未激活', 4004)
            } else if (bcrypt.compareSync(password, r.password)) {
                cookieModel.create({ uid: r.id }).then(rs => {
                    r._doc.accessToken = rs.accessToken
                    handler(res, r._doc)
                }).catch(er => {
                    handler(res, r, 4005)
                })
            } else {
                handler(res, '密码错误', 4006)
            }
        }).catch(e => {
            handler(res, e, 4007)
        })
    })
}

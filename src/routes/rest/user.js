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
                    res.json({ code: 0, msg: null, data: r })
                }).catch((err) => {
                    res.json({ code: 4000, msg: err, data: null })
                })
            }).catch(err => {
                res.json({ code: 4001, msg: err, data: null })
            })
        }).catch(err => {
            res.json({ code: 4002, msg: err, data: null })
        })
    })

    r.post('/user/login', (req, res) => {
        let nameOrEmail = req.body.nameOrEmail
        let password = req.body.password
        model.findOne().or([{ username: nameOrEmail }, { email: nameOrEmail }]).then((r) => {
            if (!r) res.json({ code: 4003, msg: '用户不存在', data: null })
            if (!r.emailVerified) {
                res.json({ code: 4004, msg: '邮箱未激活', data: null })
            } else if (bcrypt.compareSync(password, r.password)) {
                cookieModel.create({ uid: r.id }).then(rs => {
                    r._doc.accessToken = rs.accessToken
                    res.json({ code: 0, msg: null, data: r._doc })
                }).catch(er => { res.json({ code: 4005, msg: er, data: null }) })
            } else {
                res.json({ code: 4006, msg: '密码错误', data: null })
            }
        }).catch(e => {
            res.json({ code: 4007, msg: e, data: null })
        })
    })
}

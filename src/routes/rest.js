import express from 'express'
import models from '../models'

let handler = (promise, res) => {
  promise.exec((err, result) => {
    if (err) res.json(err)
    else res.json(result)
  })
}

export let restRouter = (app) => {
  let router = express.Router()
  let model = null

  router.use('/:model', (req, res, next) => {
    model = models[req.params.model]
    if (!model) res.status(404).send(`model ${req.params.model} not exists!`)
    else {
      next()
    }
  })

  router.use('/:model/:id', (req, res) => {
    let id = req.params.id
    switch (req.method) {
      case 'PUT':
        handler(model.update({ id: id }, req.body), res)
        break;
      case 'GET':
        handler(model.find({ id: id }), res)
        break;
    }
  })

  router.use('/:model', (req, res) => {
    switch (req.method) {
      case 'POST':
        handler(model.create(req.body), res)
        break;
      case 'GET':
        handler(model.find(req.body), res)
        break;
    }
  })

  return router
}

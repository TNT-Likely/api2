import { handler } from '../tools'

export let check = (keys) => {
  return (req, res, next) => {
    keys.forEach(i => {
      let key = null,
        match = null

      if (typeof i == 'string') {
        key = i
      } else if (typeof i == 'object') {
        key = i.key
        match = i.match
      }

      if (!req.body[key]) {
        handler(res, `缺少入参${key}`, 4200)
      } else if (!!match && !match.test(req.body[key])) {
        handler(res, `入参${key}格式${match}校验失败`, 4201)
      }
    })
    next()
  }
}

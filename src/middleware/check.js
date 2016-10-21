import { handler } from '../tools'

export let check = (keys) => {
  return (req, res, next) => {
    keys.forEach(i => {
      if (!req.body[i]) {
        handler(res, `缺少入参${i}`, 4200)
      }
    })
    next()
  }
}

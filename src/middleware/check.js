import { handler } from '../tools'

export default (keys) => {
  let end = null
  return (req, res, next) => {
    keys.forEach((i, index) => {
      if (end) return; //结束遍历
      let key = null,
        match = null

      if (typeof i == 'string') {
        key = i
      } else if (typeof i == 'object') {
        key = i.key
        match = i.match
      }

      if (!req.body[key]) {
        end = true
        handler(res, `缺少入参${key}`, 40200)
      } else if (!!match && !match.test(req.body[key])) {
        end = true
        handler(res, `入参${key}格式${match}校验失败`, 40201)
      } else {
        if (index == keys.length - 1) {
          next()
        }
      }
    })
  }
}

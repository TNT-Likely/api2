import rp from 'request-promise'
import handler from './handler'

class fetch {
  constructor(host) {
    this.opts = {
      url: host,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
  }

  send(res, opts) {
    return new Promise((resolve, reject) => {
      rp(opts).then(r => {
        resolve(r)
      }).catch(e => {
        handler(res, e, 40500)
      })
    })
  }

  g(res, url) {
    this.opts.url += url
    return this.send(res, this.opts)
  }

}

export default fetch

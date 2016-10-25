import rp from 'request-promise'
import handler from './handler'

class fetch {
  constructor(host) {
    this.host = host
  }

  send(res, url) {
    let opts = {
      url: this.host + url,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }

    console.log(opts)

    return new Promise((resolve, reject) => {
      rp(opts).then(r => {
        resolve(r)
      }).catch(e => {
        handler(res, e, 40500)
      })
    })
  }
}

export default fetch

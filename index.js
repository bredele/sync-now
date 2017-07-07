/**
 * Dependencies.
 */

const thenable = require('stream-then')


module.exports = later => {
  let done = false
  let data = {}
  later = thenable(later, true)
  later.then(result => {
    done = true
    data = result instanceof Array ? result[0] : result
  })
  return new Proxy(data, {
    get(target, name) {
      if (done) return data[name]
      return new Promise(resolve => {
        later.then(() => resolve(data[name]))
      })
    }
  })
}

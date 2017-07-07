

module.exports = later => {
  let done = false
  let data = {}
  later.then(result => {
    done = true
    data = result
  })
  return new Proxy(data, {
    get(target, name) {
      if (done) return data[name]
      return new Promise(resolve => {
        later.then(() => resolve(data[name]))
      })
      console.log(target, name)
    }
  })
}

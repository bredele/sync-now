/**
 * Test dependencies.
 */

const Readable = require('stream').Readable
const test = require('tape')
const sync = require('..')


test('should return promise from data property returned by a promise', assert => {
  assert.plan(1)
  const data = sync(new Promise(resolve => {
    setTimeout(() => resolve({
      name: 'foo'
    }), 300)
  }))
  data.name.then(data => assert.equal(data, 'foo'))
})


test('should return value if promise is resolved', assert => {
  assert.plan(1)
  const data = sync(new Promise(resolve => {
    setTimeout(() => resolve({
      name: 'foo'
    }), 300)
  }))
  setTimeout(() => assert.equal(data.name, 'foo'), 500)
})

test('should work with streams as well', assert => {
  assert.plan(1)
  const stream = new Readable({
    objectMode: true
  })
  stream._read = () => {}
  setTimeout(() => {
    stream.push({
      name: 'foo'
    })
    stream.push(null)
  }, 500)
  const data = sync(stream)
  data.name.then(name => {
    assert.equal(name, 'foo')
  })
})

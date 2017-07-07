/**
 * Test dependencies.
 */

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
  setTimeout(() => {
    assert.equal(data.name, 'foo')
  }, 500)
})

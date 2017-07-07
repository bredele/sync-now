/**
 * Test dependencies.
 */

const test = require('tape')
const sync = require('..')


test('should return promise from data key', assert => {
  assert.plan(1)
  const data = sync(new Promise(resolve => {
    setTimeout(() => resolve({
      name: 'foo'
    }), 300)
  }))
  data.name.then(data => assert.equal(data, 'foo'))
})

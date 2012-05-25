var assert = require('assert')
  , Snake = require('./snake')

var maze = [
  [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0]
, [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
, [1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
, [0,0,0,1,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
, [0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
, [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
, [0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
, [1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
, [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1]
, [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,1]
, [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1]
, [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,1,0,0,1]
, [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,1,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0]
, [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0]
, [0,0,1,1,1,0,1,1,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0]
, [0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0]
, [1,1,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0]
, [1,1,1,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0]
, [0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0]
, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var snake = new Snake()

var cases = [
//   { opts: { maze: maze, start: [2,11], end: [23,19] }, method: 'breadthFirst' }
// , { opts: { maze: maze, start: [2,11], end: [2,21] }, method: 'breadthFirst' }
// , { opts: { maze: maze, start: [0,0], end: [24,24] }, method: 'breadthFirst' }
// , { opts: { maze: maze, start: [2,11], end: [23,19] }, method: 'depthFirst' }
// , { opts: { maze: maze, start: [2,11], end: [2,21] }, method: 'depthFirst' }
// , { opts: { maze: maze, start: [0,0], end: [24,24] }, method: 'depthFirst' }

{ opts: { maze: maze, start: [2,11], end: [23,19] }, method: 'alternate' }
// , { opts: { maze: maze, start: [2,11], end: [2,21] }, method: 'alternate' }
// , { opts: { maze: maze, start: [0,0], end: [24,24] }, method: 'alternate' }
]

cases.forEach(function (test, index) {
  var opts = test.opts
  var result = snake[test.method](opts)
  assert.strictEqual(result.msg, 'found exit', 'expected message to be `found exit`')
  assert.strictEqual(result.status, 1, 'expected status too be 1')
  assert(Array.isArray(result.route), 'expected route to be array')
  console.log(
    '\nTest#%s: `%s`. start: [%s] end [%s]. elapsed: %s ms. route (cost %s):\n\n%s\n'
  , index+1, test.method, opts.start, opts.end, result.elapsed, result.cost, result.route.join(' -> ')
  )
})
console.log('\n\nALL TESTS PASS :)\n-------------------')


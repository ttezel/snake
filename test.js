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
  { opts: { maze: maze, start: [2,11], end: [23,19], heuristic: 'breadthFirst' } }
, { opts: { maze: maze, start: [2,11], end: [2,21], heuristic: 'breadthFirst' } }
, { opts: { maze: maze, start: [0,0], end: [24,24], heuristic: 'breadthFirst' } }
, { opts: { maze: maze, start: [2,11], end: [23,19], heuristic: 'depthFirst' } }
, { opts: { maze: maze, start: [2,11], end: [2,21], heuristic: 'depthFirst' } }
, { opts: { maze: maze, start: [0,0], end: [24,24], heuristic: 'depthFirst' } }
, { opts: { maze: maze, start: [2,11], end: [23,19], heuristic: 'linear' } }
, { opts: { maze: maze, start: [2,11], end: [2,21], heuristic: 'linear' } }
, { opts: { maze: maze, start: [0,0], end: [24,24], heuristic: 'linear' } }
, { opts: { maze: maze, start: [2,11], end: [23,19], heuristic: 'manhattan' } }
, { opts: { maze: maze, start: [2,11], end: [2,21], heuristic: 'manhattan' } }
, { opts: { maze: maze, start: [0,0], end: [24,24], heuristic: 'manhattan' } }
]

cases.forEach(function (test, index) {
  var opts = test.opts
  var result = snake.solve(opts)
  assert.strictEqual(result.msg, 'found exit', 'expected message to be `found exit`')
  assert.strictEqual(result.status, 1, 'expected status too be 1')
  assert(Array.isArray(result.route), 'expected route to be array')
  console.log(
    '\nTest#%s: %s. start: [%s] end [%s]. elapsed: %s ms. route (cost %s):\n\n%s\n'
  , index+1, opts.heuristic, opts.start, opts.end, result.elapsed, result.cost, result.route.join(' -> ')
  )
  snake.paint(result)
})
console.log('\n\nALL TESTS PASS :)\n-------------------')
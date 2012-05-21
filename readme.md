
#A collection of AI algorithms written in JS

##`Snake`

Given a 2D maze, `snake` solves the maze for a given `start` and `end` point in the maze.

Each position in the maze can be either empty or blocked (marked by a `0` or `1` respectively).

`snake` can only move up, down, left or right, but not diagonally. It cannot enter
blocked positions.

##Usage

```javascript
var Snake = require('./snake')

var maze = [
  [0,0,0,0,1,1,0,0,0,0,0,0.0,0,0,0,0,1,1,0,0,0,0,0,0]
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

var route = snake.breadthFirst({
  maze: maze
, start: [2,11]
, end: [23,19]
})

console.log('path:', route)
```

##`Snake` API

### .breadthFirst(options)

Find a path from `start` to `end`, using a breadth-first search.

### .depthFirst(options)

Find a path from `start` to `end`, using a depth-first search.

### .alternate(options)

Find a path from `start` to `end`, using an alternate search heuristic.

###options

`options` is an object with the following keys:

* `maze`     a 2D array where each index is a 0 (empty) or 1 (occupied by an obstacle)
* `start`    [x,y] coordinates - [0,0] is bottom left point
* `end`      [x,y] coordinates
##`Snake`

Given a 2D maze, `snake` solves the maze for a given `start` and `end` point in the maze.

Each position in the maze can be either empty or blocked (marked by a `0` or `1` respectively).

`snake` can only move up, down, left or right, but not diagonally. It cannot enter
blocked positions.

![route](http://dl.dropbox.com/u/32773572/snake-output.png)

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

var result = snake.solve({
  maze: maze
, start: [2,11]
, end: [23,19]
, heuristic: 'breadthFirst'
})

console.log('route:', result.route)
```

##`Snake` API

### .solve( `options` )

Find a route from `start` to `end`, using the `heuristic` to guide the search. Returns an object.

####options

`options` is an object with the following keys:

* `maze`:     a 2D Array in which each value is `0` or `1`
* `start`:    [x,y] coordinates
* `end`:      [x,y] coordinates
* `heuristic`: search heuristic to use when exploring the maze

Note: for the coordinates, [0,0] is bottom left point in `maze` (cartesian coordinate system)

####`heuristic`

Supported search heuristics are:
  * `breadthFirst` : Uses a breadth-first search.
  * `depthFirst` : Uses a depth-first search.
  * `linear` : Explores by minimizing the cartesian distance from the `end` point.
  * `manhattan` : Explores by minimizing the manhattan distance from the `end` point.

####output

`Snake.solve()` returns an object that looks like this:

```javascript
{ msg: 'found exit',
  status: 1,        //  1 = success, 0 = impossible to solve for given start & end points
  elapsed: 1,       //  total time required to run the search (milliseconds)
  numVisited: 268,  //  # of points searched in the maze to find a route
  route:          
   [ [ '2', '11' ],
     [ '2', '12' ],
     [ '2', '13' ],
     [ '2', '14' ],
     [ '2', '15' ],
     [ '2', '16' ],
     [ '3', '16' ],
     [ '4', '16' ],
     [ '5', '16' ],
     [ '6', '16' ],
     [ '7', '16' ],
     [ '7', '17' ],
     [ '7', '18' ],
     [ '7', '19' ],
     [ '6', '19' ],
     [ '5', '19' ],
     [ '4', '19' ],
     [ '3', '19' ],
     [ '2', '19' ],
     [ '2', '20' ],
     [ '2', '21' ] ],
  cost: 21 }        //  the cost for the discovered route (assumes all movements have cost = `1`)
```

###.paint(`result`)

Draws a pretty maze in your terminal (similar to [this](https://github.com/ttezel/snake#snake)). Pass in the `result` object
that you get back from `.solve()`, and it'll render the snake's path in your terminal.

## License 

(The MIT License)

Copyright (c) 2011 Tolga Tezel &lt;tolgatezel11@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
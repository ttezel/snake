var Map = require('./map')

module.exports = Snake

function Snake () {}

Snake.prototype.solve = function (opts) {
  switch (opts.heuristic) {
    case 'breadthFirst':
      return this.breadthFirst(opts)
    case 'depthFirst':
      return this.depthFirst(opts)
    case 'manhattan':
      return this.alternate(opts, 'manhattan')
    case 'linear':
      return this.alternate(opts, 'linear')
    default:
      throw new Error('heuristic '+opts.heuristic+' is not supported.')
  }
}

//get possible moves from @point
Snake.prototype.getChildren = function (point) {
  var self = this
    , x = point[0]
    , y = point[1]

  var possible = [
    up    = [x, y+1]
  , down  = [x, y-1]
  , left  = [x-1, y]
  , right = [x+1, y]
  ]
  return possible.filter(function (move) {
    if(self.isEmpty(move)) return true
  })
}

//human readable @point [x,y] is looked up as [maxY-y][x]
Snake.prototype.isEmpty = function (point) {
  var x = point[0]
    , y = point[1]
    , maxY = this._maxY

  if (y > -1 && this.opts.maze[maxY-y] && this.opts.maze[maxY-y][x] === 0) 
    return true
  return false
}

Snake.prototype.breadthFirst = function (opts) {
  var t1 = Date.now()
  this.checkOpts(opts)

  var start = opts.start
    , end = opts.end

  var visited = []
    , numVisited = 1

  //mark start as visited
  visited[start[0]] = [start[1]]

  //nodes to be visited
  var queue = [start]

  //store node:parent relationships to reconstruct the path
  var routes = {}

  routes[start.toString()] = null

  //traverse
  while (queue.length) {
    var curr = queue.shift()

    //are we done?
    if (curr[0] === end[0] && curr[1] === end[1]) {
      var parent = routes[curr.toString()]
        , cost = 1
        , route = [curr.toString().split(',')]

      //reconstruct the shortest path going backwards
      while (parent) {
        route.push(parent.split(','))
        cost++
        parent = routes[parent]
      }
      route.reverse()

      var elapsed = Date.now() - t1

      return {
        msg: 'found exit'
      , status: 1
      , elapsed: elapsed
      , numVisited: numVisited
      , route: route
      , cost: cost
      }
    }

    //not done, visit child nodes
    var children = this.getChildren(curr)

    children.forEach(function (child) {
      var x = child[0], y = child[1]

      if (!visited[x]) visited[x] = [y]
      else if (visited[x].indexOf(y) === -1) visited[x].push(y)
      else return false

      //update routes
      routes[child.toString()] = curr.toString()
      //add node to queue
      queue.push(child)
      numVisited++
    })
  }

  var elapsed = Date.now() - t1

  return {
    msg: 'maze is impossible to solve for start and end positions specified'
  , status: 0
  , elapsed: elapsed
  , numVisited: numVisited
  , route: []
  , cost: null  
  }
}

Snake.prototype.depthFirst = function (opts) {
  var t1 = Date.now()
  this.checkOpts(opts)

  var start = opts.start
    , end = opts.end

  var visited = []
    , numVisited = 0

  //mark start as visited
  visited[start[0]] = [start[1]]

  //nodes that have yet to be fully explored
  var stack = [start]

  //traverse
  while (stack.length) {
    var top = stack[stack.length-1]
  
    //are we done?
    if (top[0] === end[0] && top[1] === end[1]) {

      var elapsed = Date.now() - t1

      return {
        msg: 'found exit'
      , status: 1
      , elapsed: elapsed
      , numVisited: numVisited
      , cost: stack.length
      , route: stack
      }
    }

    //not done, push first unvisited child onto stack

    var children = this.getChildren(top)

    //find the first unvisited child
    var hasChildren = children.some(function (child) {
      var x = child[0], y = child[1]
      //if not visited, mark as visited
      if (!visited[x]) visited[x] = [y]
      else if (visited[x].indexOf(y) === -1) visited[x].push(y)
      else return false

      //push child onto stack
      stack.push(child)
      numVisited++
      return true
    })

    //nowhere to go from this node, so pop it of the stack
    if (!hasChildren) stack.pop()
  }

  var elapsed = Date.now() - t1

  return {
    msg: 'maze is impossible to solve for start and end positions specified'
  , status: 0
  , elapsed: elapsed
  , numVisited: numVisited
  , route: []
  , cost: null
  }
}

//use a @heuristic to bias the choice of next child to explore
//
//at each point in the maze, the next node to be explored is the child with the minimum
//cost, where cost is calculated according to @heuristic. If multiple children have the
//same minimum cost, the chosen one will be selected at random.
Snake.prototype.alternate = function (opts, heuristic) {
  var t1 = Date.now()
    , self = this

  this.checkOpts(opts)

  var start = opts.start
    , end = opts.end

  var visited = []
    , numVisited = 0

  //mark start as visited
  visited[start[0]] = [start[1]]

  //nodes that have yet to be fully explored
  var stack = [start]

  while (stack.length) {
    var top = stack[stack.length-1]

    //are we done?
    if (top[0] === end[0] && top[1] === end[1]) {
      var elapsed = Date.now() - t1

      return {
        msg: 'found exit'
      , status: 1
      , elapsed: elapsed
      , numVisited: numVisited
      , cost: stack.length
      , route: stack
      }
    }

    //not done, push the child with least cost onto stack
    var min = Number.MAX_VALUE
      , cheapest = []

    var children = this.getChildren(top)

    //find child with least cost

    children.forEach(function (child) {
      var x = child[0], y = child[1]

      if (visited[x] && visited[x].indexOf(y) !== -1) return

      var cost = self.getCost(child, heuristic)

      if (cost < min) {
        min = cost
        cheapest = [child]
      } else if (cost === min) {
        cheapest.push(child)
      }
    })

    //nowhere to go from here, pop off the stack
    if (!cheapest.length) {
      stack.pop()
      continue
    }

    //choose a random one of the cheapest children, push on stack
    var index = Math.floor(Math.random()*cheapest.length)
      , chosen = cheapest[index]

    stack.push(chosen)

    var cx = chosen[0]
      , cy = chosen[1]

    //mark as visited
    if (!visited[cx]) visited[cx] = [cy]
    else if (visited[cx].indexOf(cy) === -1) visited[cx].push(cy)

    numVisited++
  }

  //failure scenario
  var elapsed = Date.now() - t1

  return {
    msg: 'maze is impossible to solve for start and end positions specified'
  , status: 0
  , elapsed: elapsed
  , numVisited: numVisited
  , route: []
  , cost: null
  }
}

Snake.prototype.getCost = function (point, heuristic) {
  var start = this.opts.start
    , end = this.opts.end

  var sx = start[0]
    , sy = start[1]

  var ex = end[0]
    , ey = end[1]

  var px = point[0]
    , py = point[1]

  switch (heuristic) {
    case 'manhattan':
      return 1*(Math.abs(px-ex) + Math.abs(py-ey))
    case 'linear':
      return Math.sqrt(Math.pow(px-ex,2) + Math.pow(py-ey,2))
    default:
     throw new Error('heuristic '+heuristic+' is not supported.')
  }
}

Snake.prototype.checkOpts = function (opts) {
  var maze = opts.maze, start = opts.start, end = opts.end
  if (!maze)
    throw new Error('must specify maze')
  if (!Array.isArray(maze) || !Array.isArray(maze[0]))
    throw new Error('maze must be array of arrays')
  //cache height for faster lookup
  this._maxY = opts.maze.length-1
  this.opts = opts
  if (!this.isEmpty(start)) throw new Error('must specify valid start position. Got: ' + start)
  if (!this.isEmpty(end)) throw new Error('must specify valid end position. Got: ' + end)
}

Snake.prototype.paint = function (result) {
  var map = new Map(this, result).render()
  return this
}
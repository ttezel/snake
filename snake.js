module.exports = Snake

function Snake (opts) { this.opts = opts }

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
    , maxY = this._maxY || this.opts.maze.length-1

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

Snake.prototype.alternate = function (opts) {
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
    //console.log('numvisited', numVisited)

    var top = stack[stack.length-1]

    //console.log('top', top)

    //are we done?
    if (top[0] === end[0] && top[1] === end[1]) {
      console.log('DONE!!!')

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

    //not done, push the child closest to the guide line onto stack
    var min = Number.MAX_VALUE
      , chosen = null

    var children = this.getChildren(top)

    //find child with least cartesian distance to guide

    children.forEach(function (child) {
      var x = child[0], y = child[1]

      if (visited[x] && visited[x].indexOf(y) !== -1) return

      var dist = self.getGuideDistance(child)
      //console.log('distance', dist)
      if (dist < min) {
        min = dist
        chosen = child
      }
    })

    //console.log('chosen', chosen)

    //nowhere to go from here, pop off the stack
    if (!chosen) {
      stack.pop()
      continue
    }

    //we have a new node to visit, push on stack and mark visited
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

Snake.prototype.getGuideDistance = function (point) {
  var start = this.opts.start
    , end = this.opts.end

  var x0 = start[0]
    , y0 = start[1]

  var x1 = end[0]
    , y1 = end[1]

  var px = point[0]
    , py = point[1]

  var dx = x1-x0
    , dy = y1-y0

  var u = ((px-x0)*dx + (py-y0)*dy)

  if (u > 1) u = 1
  else if (u < 0) u = 0

  var x = x0 + u*dx
    , y = y0 + u*dy

  var distX = x-px
    , distY = x-py

  return Math.sqrt(distX*distX + distY*distY)
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
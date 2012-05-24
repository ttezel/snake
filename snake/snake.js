module.exports = Snake

function Snake () {}

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

Snake.prototype.isEmpty = function (point) {
  var x = point[0], y = point[1]
  if (this.opts.maze[y] && this.opts.maze[y][x] === 0) 
    return true
  return false
}

Snake.prototype.breadthFirst = function (opts) {
  var t1 = Date.now()
  this.checkOpts(opts)
  var start = opts.start, end = opts.end

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
    console.log('.')

    //are we done?
    if (curr[0] === end[0] && curr[1] === end[1]) {
      var parent = routes[curr.toString()]
        , cost = 1
        , out = [curr]

      //reconstruct the shortest path going backwards
      while (parent) {
        out.push(parent.split(','))
        cost++
        parent = routes[parent]
      }
      out.reverse()

      var elapsed = Date.now() - t1
        , msg = 'found exit'
      this.stdout(msg, numVisited, elapsed, cost)
      return out
    }

    //not done, visit child nodes
    var children = this.getChildren(curr)

    //add un-visited children to queue
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
    , msg = 'maze is impossible to solve for start and end positions specified'
  this.stdout(msg, numVisited, elapsed)
  return []
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

    console.log('.')
  
    //are we done?
    if (top[0] === end[0] && top[1] === end[1]) {

      var elapsed = Date.now() - t1
        , msg = 'found exit'
        , cost = stack.length
      this.stdout(msg, numVisited, elapsed, cost)
      return stack
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
    , msg = 'maze is impossible to solve for start and end positions specified'
  this.stdout(msg, numVisited, elapsed)
  return []
}

Snake.prototype.stdout = function (msg, numVisited, elapsed, cost) {
  console.log('\n' + msg)
  console.log('\n# visited nodes:', numVisited)
  console.log('\ntotal time taken: %s ms\n', elapsed)
  if (cost) console.log('\ncost of path:', cost)
}

Snake.prototype.checkOpts = function (opts) {
  var maze = opts.maze, start = opts.start, end = opts.end
  if (!maze)
    throw new Error('must specify maze')
  if (!Array.isArray(maze) || !Array.isArray(maze[0]))
    throw new Error('maze must be array of arrays')
  //normalize maze
  opts.maze = opts.maze.reverse()
  this.opts = opts
  if(!this.isEmpty(start) || !this.isEmpty(end))
    throw new Error('must specify valid start and end positions')
}
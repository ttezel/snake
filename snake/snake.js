module.exports = Snake

//
//  var start = [2,11], end = [23,19]
//
//  usage: new Snake().breadthFirst({ maze: maze, start: start, end: end })
//
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
    , numVisited = 0

  //mark start as visited
  visited[start[0]] = [start[1]]

  //nodes to be visited
  var queue = [start]

  //store node:parent relationships to reconstruct the path
  var routes = {}

  routes[start.toString()] = null

  //traverse
  while(queue.length) {
    var curr = queue.shift()

    console.log('.')

    //are we done?
    if(curr[0] === end[0] && curr[1] === end[1]) {
      console.log('\nfound exit')
      console.log('\n# visited nodes:', numVisited)

      var parent = routes[curr.toString()]
        , cost = 1
        , out = []

      //reconstruct the path
      while(parent) {
        out.push(parent.split(','))
        cost++
        parent = routes[parent]
      }
      out.reverse().push(curr)

      console.log('\ntotal time taken: %s ms', Date.now() - t1)
      console.log('\ncost of path:%s\n', cost)
      return out
    }

    var children = this.getChildren(curr)

    //add un-visited children to queue
    children.forEach(function (child) {
      var x = child[0], y = child[1]
      if (!visited[x] || visited[x].indexOf(y) === -1) {
        //mark child as visited
        if (!visited[x]) visited[x] = [y]
        else visited[x].push(y)
        //update routes
        routes[child.toString()] = curr.toString()
        //add node to queue
        queue.push(child)
        numVisited++
      }
    })
  }
  console.log('maze is impossible to solve for start and end positions specified')
  console.log('# visited nodes:', numVisited)
  return []
}

Snake.prototype.checkOpts = function (opts) {
  var maze = opts.maze, start = opts.start,end = opts.end
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
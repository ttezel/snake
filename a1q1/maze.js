module.exports = Snake

var SEARCH_TYPES = [ 'breadthFirst', 'depthFirst', 'alternate' ]

function Snake (opts) {
  if(!opts.search_type) throw new Error('must specify search_type')
  if(!opts.maze) throw new Error('must specify maze')
  this.opts = opts
  this.solve()
}

//returns a path from the start to the end of the maze
//based on the type of search specified
Snake.prototype.solve = function () {
  var type = this.opts.search_type
  if (SEARCH_TYPES.indexOf(type) === -1) {
    var msg = 'search type `' + type + '` is not supported.'
    throw new Error(msg)
  }
  this[type]()
}

Snake.prototype.breadthFirst = function () {
  
}
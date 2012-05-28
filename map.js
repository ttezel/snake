var Canvas = require('term-canvas')

module.exports = Map

function Map (snake, result) {
  this.snake = snake
  this.result = result
}

Map.prototype.render = function () {
  //draw maze in terminal
  var maze = this.snake.opts.maze

  var mHeight = maze.length
    , mWidth = maze[0].length

  this.canvas = new Canvas(mHeight + 5, mWidth + 5)
  this.ctx = this.canvas.getContext('2d')

  this.clear()

  for (numRows = maze.length, i = numRows-1; i > -1; i--) {
    for (var j = 0, numCols = maze[0].length; j < numCols; j++) {
      if (!this.snake.isEmpty([j,i])) {
        this.drawRect(j,i,'black')
      } else {
        var inRoute = this.result.route.some(function (coords) {
          if (coords[0] == j && coords[1] == i) return true 
        })
        if (inRoute) {
          this.drawRect(j,i,'blue')
        } else {
          this.drawRect(j,i,'white')
        }
      }
    }
  }

  // //draw start and end points on maze
  var start = this.snake.opts.start
    , end = this.snake.opts.end

  this.drawRect(start[0],start[1],'green')
  this.drawRect(end[0],end[1],'red')

  this.ctx.resetState()
  this.clear()
}

Map.prototype.clear = function () {
  var h = this.snake.opts.maze.length+5
  var i = -1
  while (++i < h) process.stdout.write('\n')
}

Map.prototype.drawRect = function (x,y,color) {
  y = this.snake.opts.maze.length - y
  this.ctx.fillStyle = color
  this.ctx.fillRect(2*x+5,y,2,1)
}

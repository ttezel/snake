var Snake = require('./snake')

var Canvas = require('term-canvas')

module.exports = Map

function Map (test, result) {
  this.test = test
  this.result = result
}

Map.prototype.render = function () {
  //draw maze in terminal
  var maze = this.test.opts.maze

  var mHeight = maze.length
    , mWidth = maze[0].length

  this.canvas = new Canvas(mHeight + 5, mWidth + 5)
  this.ctx = this.canvas.getContext('2d')

  var tempSnake = new Snake({ maze : maze })

  this.clear()

  for (numRows = maze.length, i = numRows-1; i > -1; i--) {
    for (var j = 0, numCols = maze[0].length; j < numCols; j++) {
      if (!tempSnake.isEmpty([j,i])) {
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
  var start = this.test.opts.start
    , end = this.test.opts.end

  this.drawRect(start[0],start[1],'red')
  this.drawRect(end[0],end[1],'red')

  this.ctx.resetState()
  this.clear()
}

Map.prototype.clear = function () {
  var h = this.test.opts.maze.length+3
  var i = -1
  while (++i < h) process.stdout.write('\n')
}

Map.prototype.drawRect = function (x,y,color) {
  y = this.test.opts.maze.length - y
  this.ctx.fillStyle = color
  this.ctx.fillRect(2*x,y,2,1)
}

var Snake = require('./snake')

var Canvas = require('term-canvas')

module.exports = MazeDraw

function MazeDraw (test, result) {
  this.test = test
  this.result = result
}

MazeDraw.prototype.render = function () {
  this.clearWindow()

  //render maze to terminal
  var maze = this.test.opts.maze
    , mWidth = maze[0].length
    , mHeight = maze.length
  
  this.canvas = new Canvas(mWidth, mHeight)
  this.ctx = this.canvas.getContext('2d')

  var tempSnake = new Snake({ maze : maze })

  for (var y = 0, height = maze.length; y < height; y++) {
    for (var x = 0, width = maze[0].length; x < width; x++) {
      if (!tempSnake.isEmpty([ x, y ])) {
        this.drawRect(x,y,'black')
      } else {
        var inRoute = this.result.route.some(function (coords) {
          if (coords[0] == x && coords[1] == y) return true 
        })

        if (!inRoute) this.drawRect(x,y,'white')
        else this.drawRect(x,y,'blue')
      }
    }
  }

  //paint start and end points on maze
  var start = this.test.opts.start
    , end = this.test.opts.end

  this.drawRect(start[0], start[1], 'green')
  this.drawRect(end[0], end[1], 'red')

  this.ctx.resetState()

  this.clearWindow()
}

MazeDraw.prototype.drawRect = function (x,y,color) {
  if (!this._maxY) this._maxY = this.test.opts.maze.length
  this.ctx.fillStyle = color
  //x:y of 2:1 gives a square
  this.ctx.fillRect(2*x+10,this._maxY-y,2,1)
}

MazeDraw.prototype.clearWindow = function () {
  //make space for maze painting
  var winHeight = process.stdout.getWindowSize()[1]
    , i = -1
    
  while (++i < winHeight) {
    process.stdout.write('\n')
  }
}

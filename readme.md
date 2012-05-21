
#Cooperative and Adaptive Algorithms

A collection of algorithms written in JS

#Set 1

##Snake

Given a 2D maze, `snake` solves the maze for a given `start` and `end` point.

Each position in the maze can be either empty or blocked.

The snake can only move up, down, left or right, but not diagonally. It cannot enter
blocked positions or move outside the maze.

An example of a maze is given in Figure 1.

##`Snake` API

### .breadthFirst(options)

Find a path from `start` to `end`, using a breadth-first search.

### .depthFirst(options)

Find a path from `start` to `end`, using a depth-first search.

### .alternate(options)

Find a path from `start` to `end`, using an alternate search heuristic.

`options` is an object with the following keys:

*`maze`
*`start`
*`end`

Each of the three API functions return a path for the from `start` to `finish`, implemented using the

###Figure 1
![Figure 1](http://dl.dropbox.com/u/32773572/ece457a-A1Q1.png)
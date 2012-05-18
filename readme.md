
#Cooperative and Adaptive Algorithms

A collection of algorithms written in JS

#Assignment 1

##Question 1

Assume a 25 ×"25 two-dimensional maze. Each square in the maze has an (x,y)
coordinate, with the bottom-left corner being (0,0) and the top-right corner being (24,24).
Each position in the maze can be either empty or blocked. In addition, there are two
“special” positions, the starting position and the exit position, both of which are selected
randomly.
The agent can only move up, down, left or right, but never diagonally. It also cannot enter
blocked positions or move outside the maze. Its objective is to find a path from its
starting position to the exit position, preferably the cheapest one. The cost of a path is the
number of positions the agent has to move through, including the starting and exit
position.
An example of a maze is given in Figure 1.
Requirements
*Implement code to find a path from the starting position to the exit position using 
(1) Breath-First Search, (2) Depth-First Search, and (3) A* Search. For the A* 
Search, you must define an appropriate heuristic function, and justify your choice. 
Your implementation should output information about the search, including the
complete path, its cost, and the number of nodes explored (or squares checked) 
before finding it.
The above three search heuristics represent the minimum requirements for this question.
Deliverables
You are expected to turn in a short paper (the shorter the better) which should include the 
following:
1. A short description of your implementations of the search methods. In particular,
for the A* Search, explain and justify your chosen heuristic function.
2. Sample output of each search method you implemented on the maze of Figure 1.
3. You will have to test each search technique three times:
  3.1 With the agent starting at S and ending at E1
  3.2 With the agent starting at S and ending at E2
  3.3 With the agent starting at (0,0) and ending (24,24)
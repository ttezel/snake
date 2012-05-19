exports.breadthFirst = function (maze) {
  console.log('called breadthfirwst')
}

exports.depthFirst = function (maze) {
  console.log('called depthfirst')
}

function check (maze) {
  if(!Array.isArray(maze) || !Array.isArray(maze[0])) return false
  return true
}
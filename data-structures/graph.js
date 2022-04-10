/*
GRAPHS

Abstract data type

Basic Graph:
Stores nodes (represented by any primitive value) and the neighbors for each node. This implementation represents a graph as an adjacency list (https://en.wikipedia.org/wiki/Adjacency_list).

Here's an example:
1---2---3
 \ /
  4
graph = {
  1: [2, 4],
  2: [1, 3, 4],
  3: [2],
  4: [1, 2]
}

Constraints:
This graph implementation is undirected and can have unconnected nodes. The nodes are represented by unique primitive values.

*** Operations:
graph.addNode(value) // value must be a primitive
=> undefined
Add node to graph

graph.removeNode(value)
=> undefined
Remove node from graph

graph.contains(value)
=> true/false
Returns true if value is found in graph, false otherwise

graph.addEdge(value1, value2)
=> undefined
Create connection between two nodes if they're both present in the graph

graph.removeEdge(value1, value2)
=> undefined
Remove connection between two nodes

graph.hasEdge(value1, value2)
=> true/false
Returns true if edge exists, false otherwise

graph.forEach(callback)
=> undefined
Traverse the graph and invoke the passed callback once for each node. The callback function receives the following for each node: node value, node Neighbors, all nodes.

Implement traversal methods for depth-first and breadth-first traversal. The methods take a starting node and a callback that gets invoked for each node. The callback should receive two arguments: the node value and the distance (number of edges that separate the node from the starting node). See example usage below.

graph.traverseDepthFirst(value1, callback)
=> undefined
Starting at the node with the value passed in, traverse the graph and invoke the callback for each node in a depth-first fashion.

graph.traverseBreadthFirst(value, callback)
=> undefined
Starting at the node with the value passed in, traverse the graph and invoke the callback for each node in a breadth-first fashion.

Example Usage:
1---2---3---5
 \ /
  4
{
  '1': [ 2, 4 ],
  '2': [ 1, 3, 4 ],
  '3': [ 2, 5 ],
  '4': [ 1, 2 ],
  '5': [ 3 ]
}

var traverseDF = [];
graph.traverseDepthFirst(1, function(val, distance) { traverseDF.push([val, distance]) });
traverseDF should be [ [ 1, 0 ], [ 2, 1 ], [ 3, 2 ], [ 5, 3 ], [ 4, 2 ] ]

var traverseBF = [];
graph.traverseBreadthFirst(1, function(val, distance) { traverseBF.push([val, distance]) });
traverseBF should be [ [ 1, 0 ], [ 2, 1 ], [ 4, 1 ], [ 3, 2 ], [ 5, 3 ] ]


*** Additional Exercises:

Given a directed graph and two nodes in the graph, write a function that indicates whether there is a route between the two nodes. Bonus: rather than returning a boolean, have your function return the shortest distance between the two nodes (the number of edges that separate them).

*/

function Graph () {
  this._nodes = {}
}

Graph.prototype.addNode = function (value) {
  if (!value) throw new Error('Value is undefined')
  this._nodes[value] = this._nodes[value] || []
}
// Time complexity:

Graph.prototype.removeNode = function (value) {
  this._nodes[value].forEach(node => {
    const neighbors = this._nodes[node]
    const deleteNodeIdx = neighbors.indexOf(value)
    if (deleteNodeIdx > -1) neighbors.splice(deleteNodeIdx, 1)
  })
  delete this._nodes[value]
}
// Time complexity:

Graph.prototype.contains = function (value) {
  return !!this._nodes[value]
}
// Time complexity:

Graph.prototype.addEdge = function (value1, value2) {
  if (!this._nodes[value1] || !this._nodes[value2]) {
    throw new Error('Cannot find node to add edge to')
  }
  this._nodes[value1].push(value2)
  this._nodes[value2].push(value1)
}

// Time complexity:

Graph.prototype.removeEdge = function (value1, value2) {
  if (!this._nodes[value1] || !this._nodes[value2]) {
    throw new Error('Cannot find node to add edge to')
  }
  this._nodes[value1].splice(this._nodes[value1].indexOf(value2), 1)
  this._nodes[value2].splice(this._nodes[value2].indexOf(value1), 1)
}
// Time complexity:

Graph.prototype.hasEdge = function (value1, value2) {
  return this._nodes[value1].indexOf(value2) > -1 || this._nodes[value2].indexOf(value2) > -1
}
// Time complexity:

Graph.prototype.forEach = function (fn) {
  for (let node in this._nodes) {
    fn(node, this._nodes[node], this._nodes)
  }
}
// Time complexity:

Graph.prototype.traverseDepthFirst = function (value, fn, visited = {}, distance = 0) {
  visited[value] = true
  fn(value, distance)
  this._nodes[value].forEach(function (neighbor) {
    if (visited[neighbor]) return
    this.traverseDepthFirst(neighbor, fn, visited, distance + 1)
  }, this)
}

Graph.prototype.traverseBreadthFirst = function (value, fn) {
  const distance = {}
  distance[value] = 0
  let queue = [value]
  while (queue.length) {
    const node = queue.shift()
    fn(node, distance[node])
    const neighbors = this._nodes[node].filter(n => {
      if (distance[n] === undefined) {
        distance[n] = distance[node] + 1
        return true
      }
    })
    queue = [...queue, ...neighbors]
  }
}

const graph = new Graph()

graph.addNode(1)
graph.addNode(2)
graph.addNode(3)
graph.addNode(4)
graph.addNode(5)
console.log(graph._nodes, 'should have 5') // { '1': [], '2': [], '3': [], '4': [], '5': [] } should have 5
graph.removeNode(5)
console.log(graph._nodes, 'should NOT have 5') // { '1': [], '2': [], '3': [], '4': [] } should NOT have 5
console.log(graph.contains(4), 'should be true') // true
console.log(graph.contains(7), 'should be false') // false
graph.addEdge(1, 2)
graph.addEdge(1, 4)
graph.addEdge(3, 2)
graph.addEdge(2, 4)
graph.addEdge(3, 4)
console.log(graph._nodes)
// // { 1: [ 2, 4 ],
// //   2: [ 1, 3, 4 ],
// //   3: [ 2, 4 ],
// //   4: [ 1, 2, 3 ]
// // }
graph.removeEdge(4, 3)
console.log(graph._nodes)
// //   1: [ 2, 4 ],
// //   2: [ 1, 3, 4 ],
// //   3: [ 2 ],
// //   4: [ 1, 2 ]
// // }
console.log(graph.hasEdge(1, 2), 'should be true') // true
console.log(graph.hasEdge(1, 3), 'should be false') // false
graph.forEach(function (node, neighbors) {
  console.log(node, 'has neighbors:', neighbors)
})
// // 1 has neighbors: [ 2, 4 ]
// // 2 has neighbors: [ 1, 3, 4 ]
// // 3 has neighbors: [ 2 ]
// // 4 has neighbors: [ 1, 2 ]
graph.addNode(5)
graph.addEdge(3, 5)
// console.log(graph._nodes)
// // {
// //   '1': [ 2, 4 ],
// //   '2': [ 1, 3, 4 ],
// //   '3': [ 2, 5 ],
// //   '4': [ 1, 2 ],
// //   '5': [ 3 ]
// // }
// graph.removeNode(4)
// console.log(graph._nodes)
/*{
  1: [ 2 ],
  2: [ 1, 3 ],
  3: [ 2, 5 ],
  5: [ 3 ]
}*/
console.log('=== traverse ===')
console.log(graph)
/*
Graph {
  _nodes: {
    '1': [ 2, 4 ],
    '2': [ 1, 3, 4 ],
    '3': [ 2, 5 ],
    '4': [ 1, 2 ],
    '5': [ 3 ]
  }
}
*/

const traverseDF = []
graph.traverseDepthFirst(1, (val, dist) => {
  traverseDF.push([val, dist])
})
console.log(traverseDF, '\nshould be [[ 1, 0 ], [ 2, 1 ], [ 3, 2 ], [ 5, 3 ], [ 4, 2 ]]')
const traverseBF = []
graph.traverseBreadthFirst(1, (val, dist) => {
  traverseBF.push([val, dist])
})
console.log(traverseBF, '\nshould be [[ 1, 0 ], [ 2, 1 ], [ 4, 1 ], [ 3, 2 ], [ 5, 3 ]]')

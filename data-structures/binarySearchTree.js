// BINARY SEARCH TREES

/*
bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.traverseBreadthFirst(callback)
=> undefined
Invoke the callback for every node in a breadth-first order

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/
// Abstract data type
// A binary search tree is a tree with the additional constraints:
//   - each node has only two child nodes (node.left and node.right)
// - all the values in the left subtree of a node are less than or equal to the value of the node
// - all the values in the right subtree of a node are greater than the value of the node
function BinarySearchTree (value) {
  this.value = value
  this.left = null
  this.right = null
}

// *** Operations:

// bsTree.insert(value)
// => bsTree (return for chaining purposes)
// Insert value into correct position within tree
// Time complexity: O(log(n))
BinarySearchTree.prototype.insert = function (value) {
  if (value < this.value) {
    if (this.left) this.left.insert(value)
    else this.left = new BinarySearchTree(value)
  } else {
    if (this.right) this.right.insert(value)
    else this.right = new BinarySearchTree(value)
  }
  return this
}

// bsTree.contains(value)
// => true/false
// Return true if value is in tree, false if not
// Time Complexity: O(log(n));
BinarySearchTree.prototype.contains = function (value) {
  if (this.value === value) return true
  else {
    if (this.value > value) {
      return !!this.left && this.left.contains(value)
    } else {
      return !!this.right && this.right.contains(value)
    }
  }
  return false
}

const bsTree = new BinarySearchTree(10)
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14)     5
//      5
// 3          15
//        8        20
//      7    9   17
//             14
console.log(bsTree)
// BinarySearchTree {
//   value: 10,
//     left: BinarySearchTree {
//     value: 5,
//       left: BinarySearchTree { value: 3, left: null, right: null },
//     right: BinarySearchTree {
//       value: 8,
//         left: [BinarySearchTree],
//         right: [BinarySearchTree]
//     }
//   },
//   right: BinarySearchTree {
//     value: 15,
//       left: BinarySearchTree { value: 14, left: null, right: null },
//     right: BinarySearchTree {
//       value: 20,
//         left: [BinarySearchTree],
//         right: null
//     }
//   }
// }
console.log(bsTree.contains(3)) // true
console.log(bsTree.contains(700)) // false

// In-Order traversal is most common
// visit left branch, then current node, than right branch
// For binary search tree, this visits the nodes in ascending order (hence the name)
// O(n)
BinarySearchTree.prototype.dfsInOrder = function (fn) {
  if (this.left) this.left.dfsInOrder(fn)
  fn(this)
  if (this.right) this.right.dfsInOrder(fn)
  return
}

// Time complexity:
const dfsInOrderResult = []
bsTree.dfsInOrder(function (node) {
  dfsInOrderResult.push(node.value)
})
console.log('dfsInOrderResult')
console.log(dfsInOrderResult, 'should be [3,5,7,8,9,10,14,15,17,20]')

// Pre-Order traversal
// visits current node before its child nodes
// O(n)
BinarySearchTree.prototype.dfsPreOrder = function (fn) {
  fn(this)
  if (this.left) this.left.dfsPreOrder(fn)
  if (this.right) this.right.dfsPreOrder(fn)
}
// Time complexity:

const dfsPreOrderResult = []
bsTree.dfsPreOrder(function (node) {
  dfsPreOrderResult.push(node.value)
})
console.log('dfsPreOrderResult')
console.log(dfsPreOrderResult, 'should be [10,5,3,8,7,9,15,14,20,17]')

// Post-Order traversal
// visit the current node after its child nodes
// O(n)
BinarySearchTree.prototype.dfsPostOrder = function (fn) {
  if (this.left) this.left.dfsPostOrder(fn)
  if (this.right) this.right.dfsPostOrder(fn)
  fn(this)
}

const dfsPostOrderResult = []
bsTree.dfsPostOrder(function (node) {
  dfsPostOrderResult.push(node.value)
})
console.log(dfsPostOrderResult, 'should be [3,7,9,8,5,14,17,20,15,10]')

// O(n)
BinarySearchTree.prototype.bfs = function (fn) {
  const queue = [this]
  while(queue.length) {
    const target = queue.shift()
    fn(target)
    if (target.left) queue.push(target.left)
    if (target.right) queue.push(target.right)
  }
}

const bfsResult = []
bsTree.bfs(function (node) {
  bfsResult.push(node.value)
})
console.log('=== bfsResult ===')
console.log(bfsResult, 'should be [10,5,15,3,8,14,20,7,9,17]')

// O(n)
// A binary tree is full if every node has either zero or two children (no nodes have only one child)
BinarySearchTree.prototype.checkIfFull = function () {
  var result = true
  this.bfs(function (node) {
    if (!node.left && node.right) result = false
    else if (node.left && !node.right) result = false
  })
  return result
}

console.log(bsTree.checkIfFull(), 'should be false')

var fullBSTree = new BinarySearchTree(10)
fullBSTree.insert(5).insert(20).insert(15).insert(21).insert(16).insert(13)
console.log(fullBSTree.checkIfFull(), 'should be true')

// For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.
// O(n)
BinarySearchTree.prototype.checkIfBalanced = function () {
  var heights = []
  var recurse = function (node, height) {
    if (!node.left && !node.right) return heights.push(height)
    node.left && recurse(node.left, height + 1)
    node.right && recurse(node.right, height + 1)
  }
  recurse(this, 1)
  var min = Math.min.apply(null, heights)
  var max = Math.max.apply(null, heights)
  return max - min <= 1
}

console.log(bsTree.checkIfBalanced(), 'should be true')
console.log(fullBSTree.checkIfBalanced(), 'should be false')

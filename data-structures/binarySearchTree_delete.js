// https://github.com/Apress/js-data-structures-and-algorithms/blob/master/Chapter15(Trees).js

function BinarySearchTree () {
  this._root = null
}

BinarySearchTree.prototype.insert = function (value) {
  const thisNode = {
    left: null,
    right: null,
    value: value
  }
  if (!this._root) {
    //if there is no root value yet
    this._root = thisNode
  } else {
    //loop traverse until
    let currentRoot = this._root
    while (true) {
      if (currentRoot.value > value) {
        //let's increment if it's not a null and insert if it is a null
        if (currentRoot.left != null) {
          currentRoot = currentRoot.left
        } else {
          currentRoot.left = thisNode
          break
        }
      } else if (currentRoot.value < value) {
        //if bigger than current, put it on the right
        //let's increment if it's not a null and insert if it is a null
        if (currentRoot.right != null) {
          currentRoot = currentRoot.right
        } else {
          currentRoot.right = thisNode
          break
        }
      } else {
        //case that both are the same
        break
      }
    }
  }
  return this
}

BinarySearchTree.prototype.traverseInOrder = function () {
  traverseInOrderHelper(this._root)

  function traverseInOrderHelper (node) {
    if (!node)
      return
    traverseInOrderHelper(node.left)
    console.log(node.value)
    traverseInOrderHelper(node.right)
  }
}

BinarySearchTree.prototype.bfs = function () {
  const root = this._root,
    queue = []

  if (!root) return

  queue.push(root)

  while (queue.length) {
    const temp = queue.shift()
    console.log(temp.value)
    if (temp.left) queue.push(temp.left)
    if (temp.right) queue.push(temp.right)
  }
}

BinarySearchTree.prototype.remove = function (value) {

  return deleteRecursively(this._root, value)

  function deleteRecursively (root, value) {
    if (!root) {
      return null
    } else if (value < root.value) {
      root.left = deleteRecursively(root.left, value)
    } else if (value > root.value) {
      root.right = deleteRecursively(root.right, value)
    } else {
      //no child
      if (!root.left && !root.right) {
        return null // case 1
      } else if (!root.left) { // case 2
        root = root.right
        return root
      } else if (!root.right) { // case 2
        root = root.left
        return root
      } else {
        const temp = findMin(root.right) // case 3
        root.value = temp.value
        root.right = deleteRecursively(root.right, temp.value)
        return root
      }
    }
    return root
  }

  function findMin (root) {
    while (root.left) {
      root = root.left
    }
    return root
  }
}

const bsTree = new BinarySearchTree()
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14)

// bsTree.traverseInOrder() // 3 5 7 8 9 14 15 17 20
bsTree.bfs()
//      5
// 3          15
//        8        20
//      7    9   17
//             14
console.log('===')
bsTree.remove(5)

// bsTree.traverseInOrder() // 3 7 8 9 14 15 17 20
bsTree.bfs()
//      7
// 3          15
//        8        20
//           9   17
//             14

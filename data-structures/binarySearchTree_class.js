/** Reference
 * https://www.30secondsofcode.org/articles/s/js-data-structures-binary-search-tree
 * https://levelup.gitconnected.com/deletion-in-binary-search-tree-with-javascript-fded82e1791c
 */

class BSTNode {
  constructor(value, parent = null) {
    this.left = null
    this.right = null
    this.value = value
  }
}

class BST {
  constructor(value) {
    this.root = new BSTNode(value)
  }

  * inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  * postOrderTraversal(node = this) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  * preOrderTraversal(node = this.root) {
    yield node
    if (node.left) yield* this.preOrderTraversal(node.left)
    if (node.right) yield* this.preOrderTraversal(node.right)
  }

  insert(value, node = this.root) {
    if (node.value === value) throw new Error('Cannot insert duplicate value')
    else if (node.value > value) {
      if (!node.left) {
        node.left = new BSTNode(value, node)
        return this
      } else return this.insert(value, node.left)
    } else {
      if (!node.right) {
        node.right = new BSTNode(value, node)
        return this
      } else return this.insert(value, node.right)
    }
  }

  find(value, node = this.root) {
    if (node.value === value) return node
    else if (node.value > value) {
      if (node.left) return this.find(value, node.left)
      else return undefined
    } else if (node.value < value) {
      if (node.right) return this.find(value, node.right)
      else return undefined
    }
  }

  remove(value) {
    this.root = this.removeNode(this.root, value)
  }

  removeNode(node, value) {
    if (!node) return node

    if (node.value > value) {
      if (node.left) {
        node.left = this.removeNode(node.left, value)
        return node
      } else {
        throw new Error('Cannot find node to delete')
      }
    } else if (node.value < value) {
      if (node.right) {
        node.right = this.removeNode(node.right, value)
        return node
      } else {
        throw new Error('Cannot find node to delete')
      }
    } else {
      // 여기서 리턴하는 값 = 지워질 노드의 parent의 right 또는 left에 연결할 값.
      if (!node.left && !node.right) {
        return null
      } else if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      } else {
        let temp = this.getInOrderPredecessor(node.right)
        console.log(temp.value)
        node.value = temp.value
        node.right = this.removeNode(node.right, temp.value)
        return node
      }
    }
    throw new Error('error')
  }

  /*
  // ex. remove 40
  (removeNode #1) node.value = 30
        node.value < 40
          node.right
             node.right = this.removeNode(node.right (40), 40) // (50) <- #1의 리턴값
  (removeNode #2) node.value = 40
        node.value === 40
          node.right && node.left
             temp: 50
             node.value = 50
             node.right = this.removeNode(node.right (50), 35) // null = #3의 리턴값
             return node // (50) -> #1
  (removeNode #3) node.value === 50
        node.value === 50
          !node.left && !node.right
            return null // -> #2

      getInOrderPredecessor(node) {
          while (node.left) {
              node = node.left
          }
          return node
      }
  }
  */

  // const bst = new BST(30)

  // bst.insert(10).insert(15).insert(12).insert(40).insert(35).insert(50);

// console.log([...bst.inOrderTraversal()].map(x => x.value)) // [10, 12, 15, 30, 35, 40, 50]

// console.log(bst.find(70)) // undefined

// console.log(bst.find(15))
/*
Circular *1: 15, Circular *2: 12
<ref *1> BSTNode {
  left: BSTNode { left: null, right: null, value: 12, parent: [Circular *1] },
  right: null,
  value: 15,
  parent: <ref *2> BSTNode {
    left: null,
    right: [Circular *1],
    value: 10,
    parent: BSTNode {
      left: [Circular *2],
      right: [BSTNode],
      value: 30,
      parent: null
    }
  }
}

* */

// console.log(bst.remove(177)) // Error: Cannot find node to delete

// bst.remove(12) // null -> 15 -> 10 -> 30
// console.log([...bst.preOrderTraversal()].map(x => x.value)) // [30, 10, 15, 40, 35, 50]

// bst.remove(10) // 10 -> 30
// console.log([...bst.inOrderTraversal()].map(x => x.value)); // [ 12, 15, 30, 35, 40, 50 ]

// bst.remove(40) // null -> 30
// console.log([...bst.inOrderTraversal()].map(x => x.value)); // [ 10, 12, 15, 30, 35, 50 ]

// bst.remove(30)
// console.log([...bst.inOrderTraversal()].map(x => x.value)); // [ 10, 12, 15, 35, 40, 50 ]
//

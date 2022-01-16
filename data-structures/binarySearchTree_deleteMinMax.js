// 깃헙에 코드가 없길래 강의 보고 코드 따라침

function BinarySearchTree (value) {
  this.value = value
  this.left = null
  this.right = null
}

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

const bsTree = new BinarySearchTree(10)
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14)
//         10
//    5         15
// 3    8    14    20
//   7    9     17

BinarySearchTree.prototype.dfsInOrder = function (fn) {
  if (this.left) this.left.dfsInOrder(fn)
  fn(this)
  if (this.right) this.right.dfsInOrder(fn)
  return
}

const dfsInOrderResult = []
bsTree.dfsInOrder(function (node) {
  console.log(node.value) // 3, 5, 7, 8, 9, 10, 13
})
console.log('dfsInOrderResult')
console.log(dfsInOrderResult, 'should be [3,5,7,8,9,10,14,15,17,20]')

BinarySearchTree.prototype.deleteMin = function (parent) {
  if (!this.left && !this.right) {
    if (parent) parent.left = null
    else this.value = null
  } else if (!this.left && this.right) {
    if (parent) {
      parent.left = this.right
    } else {
      this.value = this.right.value
      this.right = this.right.right
    }
  }
  if (this.left) this.left.deleteMin(this)
}

// 3,5,7,8,9,10,14,15,17,20
// bsTree.deleteMin()
// bsTree.dfsInOrder(function (node) {
//   console.log(node.value) // 5, 7, 8, 9, 10, 14, 15, 17, 20
// })
//
// bsTree.deleteMin()
// bsTree.dfsInOrder(function (node) {
//   console.log(node.value) // 7, 8, 9, 10, 14, 15, 16, 17, 20
// })

BinarySearchTree.prototype.deleteMax = function (parent) {
  if (!this.left && !this.right) {
    if (parent) parent.right = null
    else this.value = null
  } else if (!this.right && this.left) {
    if (parent) parent.right = this.left
    else {
      this.value = this.left.value
      this.left = this.left.left
    }
  }
  if (this.right) this.right.deleteMax(this)
}

// 3,5,7,8,9,10,14,15,17,20
// bsTree.deleteMax()
// bsTree.dfsInOrder(function (node) {
//   console.log(node.value) // 3, 5, 7, 8, 9, 10, 14, 15, 17
// })
//
// console.log('===')
//
// bsTree.deleteMax()
// bsTree.dfsInOrder(function (node) {
//   console.log(node.value) // 3, 5, 7, 8, 9, 10, 14, 15
// })

// if current.value = value
//   return true
// else
// if current.value > value
//   if (current.left) current.left.contains(value)
//   // else return false
//   else if current.value < value
//     if (current.right) current.right.contains(value)
// // else return false\
// return false

BinarySearchTree.prototype.findAndDeleteNode = function (value, parent) {
  if (this.value === value) return deleteNode(this, parent)
  else {
    if (this.value > value) {
      return !!this.left && this.left.findAndDeleteNode(value, this)
    } else {
      return !!this.right && this.right.findAndDeleteNode(value, this)
    }
  }
}

const deleteNode = function (current, parent) {
  const childCount = (!!current.left ? 1 : 0) + (!current.right ? 1 : 0)
  let replacement
  let replacementParent
  if (!parent) {
    switch (childCount) {
      case 2:
        replacement = this.left
        while (replacement.right !== null) {
          replacementParent = replacement
          replacement = replacement.right
        }

        if (replacementParent !== null) {
          replacementParent.right = replacement.left
          replacement.right = this.right
          replacement.left = this.left
        } else {
          replacement.right = this.right
        }
    }
  } else {
    switch (childCount) {
      case 2:
        replacement = current.left
        replacementParent = current

        while (replacement.right !== null) {
          replacementParent = replacement
          replacement = replacement.right
        }

        replacementParent.right = replacement.left

        replacement.right = current.right
        replacement.left = current.left

        if (current.value < parent.value) {
          parent.left = replacement
        } else {
          parent.right = replacement
        }
    }
  }
}

// 3,5,7,8,9,10,14,15,17,20
console.log('findAndDeleteNode')
bsTree.findAndDeleteNode(14)
bsTree.dfsInOrder(function (node) {
  console.log(node.value) // 3, 5, 7, 8, 9, 10, 14, 15
})

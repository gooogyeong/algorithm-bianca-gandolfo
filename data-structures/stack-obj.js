// object storage + class

class Stack {
  constructor () {
    this.storage = {}
    this.size = 0
  }

  push (element) {
    this.size++
    this.storage[this.size] = element
  }

  pop () {
    let removed = this.storage[this.size]
    delete this.storage[this.size]
    this.size--
    return removed
  }

  peek () {
    return this.storage[this.size]
  }
}

const stack = new Stack() // stack은 Stack class의 isntance로서 stack의 method인 push, pop, peek을 사용할 수 있다

stack.push('dog')
stack.push('cat')
stack.push('bear')

stack.pop() // bear

stack.peek() // cat

console.log(stack.storage) // { '1': 'dog', '2': 'cat' }


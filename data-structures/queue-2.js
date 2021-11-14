class Queue {
  constructor() {
    this.storage = {}
    this.head = 0
    this.tail = 0
  }

  enqueue(element) {
    this.storage[this.tail] = element
    this.tail++
  }

  dequeue() {
    let removed = this.storage[this.head]
    delete this.storage[this.head]
    this.head++
    return removed
  }
}

const queue = new Queue()

queue.enqueue('seahorse')
queue.enqueue('dolphin')
queue.enqueue('whale shark')
console.log(queue.storage) // { '0': 'seahorse', '1': 'dolphin', '2': 'whale shark' }

queue.dequeue() // seahorse
console.log(queue.storage) // { '1': 'dolphin', '2': 'whale shark' }
queue.dequeue()
console.log(queue.storage) // { '2': 'whale shark' }

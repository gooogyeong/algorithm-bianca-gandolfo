function Stack (capacity) {
  this._capacity = capacity || Infinity
  this._storage = {}
  this._count = 0
}

// O(1)
Stack.prototype.push = function (value) {
  if (this._count < this._capacity) {
    this._storage[this._count++] = value
    return this._count
  }
  return 'Max capacity already reached. Remove element before adding a new one.'
}

// O(1)
Stack.prototype.pop = function () {
  if (this._count === 0) {
    return 'No element inside the stack. Add element before poping.'
  }
  var value = this._storage[--this._count]
  delete this._storage[this._count]
  if (this._count < 0) {
    // HELP: DOES THIS HAPPEN ?
    this._count = 0
  }
  return value
}

// O(1)
Stack.prototype.peek = function () {
  return this._storage[this._count - 1]
}

// O(1)
Stack.prototype.count = function () {
  return this._count
}

function Queue_TwoStacks() {
  this._stackIn = new Stack();
  this._stackOut = new Stack();
}

Queue_TwoStacks.prototype.enqueue = function(val) {
  this._stackIn.push(val);
};

Queue_TwoStacks.prototype._transferStacks = function() {
  while (this._stackIn.count() > 0) {
    this._stackOut.push(this._stackIn.pop());
  }
};

Queue_TwoStacks.prototype.dequeue = function() {
  if (this._stackOut.count() === 0) this._transferStacks();
  // stackOut의 마지막 요소 = stackIn의 첫번째 요소였던 것
  return this._stackOut.pop();
};

Queue_TwoStacks.prototype.count = function() {
  return this._stackIn.count() + this._stackOut.count();
};

Queue_TwoStacks.prototype.peek = function() {
  if (this._stackOut.count() === 0) this._transferStacks();
  return this._stackOut.peek();
};

var myQueue_TwoStacks = new Queue_TwoStacks()
myQueue_TwoStacks.enqueue('cat')
myQueue_TwoStacks.enqueue('dog')
console.log(myQueue_TwoStacks.dequeue()) // 'cat'
myQueue_TwoStacks.enqueue('dolphin')
console.log(myQueue_TwoStacks.dequeue()) // 'dog'

// var myQueue_TwoStacks = new Queue(3);
// console.log(myQueue_TwoStacks.enqueue('a'), 'should be 1');
// console.log(myQueue_TwoStacks.enqueue('b'), 'should be 2');
// console.log(myQueue_TwoStacks.enqueue('c'), 'should be 3');
// console.log(myQueue_TwoStacks.enqueue('d'), 'should be Max capacity reached');
// console.log(myQueue_TwoStacks.dequeue(), 'should be a');
// console.log(myQueue_TwoStacks.count(), 'should be 2');
// console.log(myQueue_TwoStacks.peek(), 'should be b');
// console.log(myQueue_TwoStacks.count(), 'should be 2');

/*
MERGE SORT

*** Description

Merge sort employs a divide and conquer strategy - merge two sorted subarrays into one sorted array.

Recursive top-down approach:
Recursively break down array into two subarrays and sort them recursively. Subarrays are broken down until they have only 1 element (implying they are sorted).

Iterative bottom-up approach:
Split array into sublists of size 1, merge adjacent sublists into sorted lists, repeat until no more sublists.

*** Exercises

- Implement recursive merge sort (you might want to write a helper function to handle the merge step)
- Implement iterative merge sort
- Identify time complexity

- Modify function to take comparator function. specify default if not provided (check out native Array.sort comparator function for reference)
- Use your comparator function to verify that your sort is stable by taking input: [{value: 15}, {value: 10, order: 1}, {value: 10, order: 2}]

Optimization:
- Refactor your iterative solution to be a natural merge sort. This means that the initial subarrays are naturally occurring sorted sequences. How does this impact time complexity and adaptivity?
ex:
input array: [ 1 2 4 5 9 ]
subarrays for regular merge sort: [ [1], [2], [4], [5], [9] ]
subarrays for natural merge sort: [ [1,2], [4,5], [9] ]

*/

const merge = (leftArr, rightArr) => {
  let lPointer = 0, rPointer = 0, result = []
  while (result.length < (leftArr.length + rightArr.length)) {
    if (lPointer === leftArr.length) result = result.concat(rightArr.slice(rPointer))
    else if (rPointer === rightArr.length) result = result.concat(leftArr.slice(lPointer))
    else if (leftArr[lPointer] < rightArr[rPointer]) result.push(leftArr[lPointer++])
    else result.push(rightArr[rPointer++])
  }
  return result
}

const mergeSortRecursive = (arr) => {
  if (arr.length <= 1) return arr
  const leftArr = arr.slice(0, arr.length / 2)
  const rightArr = arr.slice(arr.length / 2)
  const sortedLeftArr = mergeSortRecursive(leftArr)
  const sortedRightArr = mergeSortRecursive(rightArr)
  return merge(sortedLeftArr, sortedRightArr)
}

// console.log(mergeSortRecursive([99, 1, 37, 101, 3]))

const mergeSortIterative = (arr) => {
  let splitArr = arr.map(num => [num])
  while (splitArr.length > 1) {
    const result = []
    console.log(splitArr)
    for (let i = 0; i < splitArr.length; i += 2) {
      if (!splitArr[i + 1]) result.push(splitArr[i])
      else result.push(merge(splitArr[i], splitArr[i + 1]))
    }
    splitArr = result
  }
  return splitArr[0]
}

console.log(mergeSortIterative([99, 1, 37, 101, 3]))
  // [ [ 99 ], [ 1 ], [ 37 ], [ 101 ], [ 3 ] ]
  // [ [ 1, 99 ], [ 37, 101 ], [ 3 ] ]
  // [ [ 1, 37, 99, 101 ], [ 3 ] ]
  // [ 1, 3, 37, 99, 101 ]

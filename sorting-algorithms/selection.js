/*
SELECTION SORT

*** Description

Iterate over array and grow a sorted array behind current element.

For each position, find the smallest element in unsorted subarray starting at that position, and swap elements so that smallest element is at the beginning of unsorted subarray.

example:
[ 1 2 3|9 5 7 4 ]
 sorted|unsorted
smallest element in unsorted subarray is 4
swap with element at beggining of unsorted subarray
sorted portion has now grown:
[ 1 2 3 4|5 7 9 ]

*** Exercises

- Implement selection sort
- Identify time complexity

Stable Variant
- Implement as a stable sort - rather than swapping, the minimum value is inserted into the first position and all other items are shifted one to the right. How does this impact performance?
- Modify function to take comparator function. specify default if not provided (check out native Array.sort comparator function for reference)
- Use your comparator function to verify that your sort is stable by taking input: [{value: 15}, {value: 10, order: 1}, {value: 10, order: 2}]

- Implement selection sort for a linked list (you can use your data structure implemention from earlier in the course). How does this impact performance and stability?

*/

const selectionSort = (arr, comparator) => {
  console.log('initial array')
  console.log(arr)
  console.log('============')
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i
    let minVal = arr[i]
    const comparatorFunc = comparator || defaultComparator
    for (let j = i + 1; j < arr.length; j++) {
      if (comparatorFunc(arr[j], minVal) < 0) {
        minVal = arr[j]
        minIdx = j
      }
    }
    console.log(`idx: ${minIdx} minValue: ${minVal}`)
    swap(arr, i, minIdx)
    console.log(arr)
  }
  return arr
}

const defaultComparator = (a, b) => {
  if (a < b) return -1
  else if (a > b) return 1
  return 0
}

const swap = (arr, idx1, idx2) => {
  const oldIdx1Val = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = oldIdx1Val
  return arr
}

selectionSort([20, 1, 9, 8, 10, 13, 7])

// initial array
//   [20,  1, 9, 8, 10, 13, 7]
// ============
// idx: 1 minValue: 1
//   [1, 20, 9, 8, 10, 13, 7]
// idx: 6 minValue: 7
//   [1,  7,  9, 8, 10, 13, 20]
// idx: 3 minValue: 8
//   [1,  7,  8, 9, 10, 13, 20]
// idx: 3 minValue: 9
//   [1,  7,  8, 9, 10, 13, 20]
// idx: 4 minValue: 10
//   [1,  7,  8, 9, 10, 13, 20]
// idx: 5 minValue: 13
//   [1,  7,  8, 9, 10, 13, 20]
// idx: 6 minValue: 20
//   [1,  7,  8, 9, 10, 13, 20]

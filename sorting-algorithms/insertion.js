/*
INSERTION SORT

*** Description

Iterate over array and grow a sorted array behind current element.

For each position, compare value of element with previous elements and swap positions if previous element is larger.

example:
[ 3 4 5|1 2 6 ]
 sorted|unsorted
swaps:
[ 3 4 1 5|2 6 ]
[ 3 1 4 5|2 6 ]
[ 1 3 4 5|2 6 ]
now repeat for next unsorted element

*** Exercises

- Implement insertion sort for array of numbers
- Identify time complexity

- Modify function to take comparator function. specify default if not provided (check out native Array.sort comparator function for reference)
- Use your comparator function to verify that your sort is stable by taking input: [{value: 15}, {value: 10, order: 1}, {value: 10, order: 2}]

*** Extra credit
- Implement shell sort, a generalization of insertion sort
(https://en.wikipedia.org/wiki/Shellsort)

*/

const insertionSort = (arr, comparator = defaultComparator) => {
  console.log('initialArr')
  console.log(arr)
  console.log('=== === ===')
  for (let i = 1; i < arr.length; i++) {
    let compareIdx = i - 1
    while (compareIdx >= 0 && comparator(arr[i], arr[compareIdx]) < 0) {
      arr = swap(arr, i, compareIdx)
      i = compareIdx
      compareIdx--
    }
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

insertionSort([17, 7, 11 ,2, 38, 5])

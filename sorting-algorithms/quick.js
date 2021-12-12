/*
QUICK SORT

*** Description

Like merge sort, quick sort employs a divide and conquer strategy.

It has a partitioning step, in which you pick an element (called a pivot) and partition the array so that all smaller elements come before pivot and all larger elements come after. The pivot will be in its final position. Recursively apply this to the subarray of smaller elements and the subarray of larger elements.

*** Exercises

- Write a partition helper function. For choice of pivot, for a basic implementation, we recommend choosing either the first or last element in the subarray. If you need hints, look up the Lumoto partiton scheme. Test this out before moving forward!
- Implement quicksort
- Identify time complexity

- Consider implications for choice of pivot (https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot)

*** Extra Credit

Variants:
- Implement a multi-pivot quicksort (ex: partition into 3 subarrays using 2 pivots)

*/

const quicksort = (arr, lo = 0, hi = arr.length - 1) => {
  if (lo < hi) {
    const p = partition(arr, lo, hi)
    console.log(`p: ${p}`)
    quicksort(arr, lo, p - 1)
    quicksort(arr, p + 1, hi)
  }
  return arr
}

/**
 * double swap
 */
const partition = (arr, lo, hi) => {
  const pivot = arr[hi]
  let currPivotIdx = hi
  let pivotLoc = lo
  // for (let i = 0; i < hi; i++) {
  for (let i = lo; i < hi; i++) {
    if (pivotLoc === currPivotIdx) break
    if (arr[pivotLoc] < pivot) pivotLoc++
    else {
      swap(arr, currPivotIdx, currPivotIdx - 1)
      if (1 < currPivotIdx - pivotLoc) swap(arr, pivotLoc, currPivotIdx)
      currPivotIdx--
    }
  }
  return pivotLoc
}

/**
 * lamuto partition scheme
 */
// const partition = (arr, lo, hi) => {
//   const pivot = arr[hi]
//   let pivotLoc = lo
//   for (let i = lo; i < hi; i++) {
//     if (arr[i] <= pivot) {
//       swap(arr, pivotLoc, i)
//       pivotLoc++
//     }
//   }
//   swap(arr, pivotLoc, hi)
//   return pivotLoc
// }

const swap = (arr, idx1, idx2) => {
  const oldIdx1Val = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = oldIdx1Val
  return arr
}

console.log(quicksort([5, 3, 1, 4, 2]))
// partitioning from 0 to 4 => partition: 1
// partitioning from 2 to 4 => partition: 4
// partitioning from 2 to 3 => partition: 3
//   [ 1, 2, 3, 4, 5 ]

console.log(quicksort([9, 17, 2, 83, 11, 27, 10]))
// partitioning from 0 to 6 => partition: 2
// partitioning from 0 to 1 => partition: 0
// partitioning from 3 to 6 => partition: 4
// partitioning from 5 to 6 => partition: 6
//   [
//   2,  9, 10, 11,
//     17, 27, 83
//   ]

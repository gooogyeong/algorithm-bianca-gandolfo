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

const quicksort = (array, lo, hi) => {
  if (lo === undefined) lo = 0
  if (hi === undefined) hi = array.length - 1

  if (lo < hi) {
    // partition array
    const p = partition(array, lo, hi)
    console.log('partitioning from', lo, 'to', hi, '=> partition:', p)
    // sort subarrays
    quicksort(array, lo, p - 1)
    quicksort(array, p + 1, hi)
  }

  // for initial call, return sorted array
  if (hi - lo === array.length - 1) return array
}

/**
 * double swap partition
 */
const partition = (arr, lo, hi) => {
  let currPivotIdx = hi
  const pivot = arr[currPivotIdx]
  let pivotLoc = lo
  for (let i = lo; i < hi; i++) {
    if (arr[pivotLoc] < pivot) pivotLoc++
    else {
      if (pivotLoc === currPivotIdx) break
      swap(arr, currPivotIdx - 1, currPivotIdx)
      if (currPivotIdx - pivotLoc > 1) swap(arr, pivotLoc, currPivotIdx)
      currPivotIdx--
    }
  }
  return pivotLoc
}

/**
 Lomuto partition scheme
 **/
// const partition = (arr, lo, hi) => {
//   // choose last element as pivot
//   const pivot = arr[hi]
//   // keep track of index to put pivot at
//   let pivotLoc = lo
//   // iterate through subarray and if element <= pivot, place element before pivotLoc
//   for (let i = lo; i < hi; i++) {
//     if (arr[i] <= pivot) {
//       swap(arr, pivotLoc, i)
//       pivotLoc++
//     }
//   }
//   // move pivot to its proper location
//   swap(arr, pivotLoc, hi)
//   return pivotLoc
// }

const swap = (arr, i1, i2) => {
  if (i1 === i2) return
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
  // console.log('swapped', arr[i1], arr[i2], 'in', arr)
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

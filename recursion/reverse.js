/*
Implement a function that will reverse a string recursively.

reverse('abcdefg')
=> 'gfedcba'
*/

/**
 loop
 */
// const reverse = (str) => {
//   let res = ''
//   for (let i = str.length - 1; i >= 0; i--) {
//     res = res + str[i]
//   }
//   return res
// }

/**
 recursion
 */
const reverse = (str, reverseStr = '') => {
  while (reverseStr.length < str.length) {
    reverseStr = reverseStr + str[str.length - reverseStr.length - 1]
  }
  return reverseStr
}

const reverseAbc = reverse('abc') // cba
const reversePoor = reverse('poor') // roop
const reverseOtto = reverse('otto') // otto

console.log(reverseAbc)
console.log(reversePoor)
console.log(reverseOtto)

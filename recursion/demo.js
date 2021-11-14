/**
 * factorial - recursion
 * */
// const factorial = (n, acc = 1) => {
//   while (n > 1) {
//     return factorial(n - 1, acc * n)
//   }
//   return acc
// }

/**
 * factorial - loop
 * */
// const factorial = (n) => {
//   let res = 1
//   for (let i = n; i >= 1; i--) {
//     res = res * i
//   }
//   return res
// }
//
// const factorialTwo = factorial(2)
// const factorialFive = factorial(5)
// const factorialSix = factorial(6)
// console.log(factorialTwo)
// console.log(factorialFive)
// console.log(factorialSix)

// const loopNTimes = (n) => {
//   console.log(`n equals ${n}`)
//   if (n <= 1) {
//     return 'complete'
//   }
//   return loopNTimes(n-1)
// }
//
// const res = loopNTimes(3)
// console.log(res)

// let tracker = 0
// const callMe = function () {
//   tracker++
//   if (tracker === 3) {
//     return 'exit!'
//   }
//   console.log('looping...')
//   // return callMe()
//   callMe()
// }
//
// const res = callMe()
// console.log(res)

// console.log(arguments)
// console.log(require('module'))

//module.exports
const CalculatorOne = require('./3a-calc1.js')
const calculator = new CalculatorOne()

console.log(calculator.add(3, 2))

//exports
const { add, multiply } = require('./3b-calc2.js')
console.log(add(2, 5))
console.log(multiply(2, 5))

//caching (console.log in exported module only gets executed once even though the function is executed three times in this module)
require('./3c-test.js')()
require('./3c-test.js')()
require('./3c-test.js')()
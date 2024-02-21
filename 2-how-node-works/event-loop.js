const fs = require('node:fs')


fs.readFile(`${__dirname}/test-file.txt`, (err, data) => {
  console.log('file read')
})
console.log('reading file...')

setTimeout(() => { console.log('Timer 1 finished') }, 0)

setImmediate(() => { console.log('Set immediate callback') })

setTimeout(() => { console.log('Timer 2 finished') }, 5)

setTimeout(() => { console.log('Timer 3 finished') }, 1000)
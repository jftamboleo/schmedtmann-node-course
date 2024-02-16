const fs = require('node:fs')

// const textIn = fs.readFileSync('./txt/input.txt', { encoding: 'utf-8' })
// console.log(textIn)

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

fs.readFile('./txt/start.txt', { encoding: 'utf-8' }, (err, data) => {
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
    console.log(data2)
  })
})
console.log('reading file...')
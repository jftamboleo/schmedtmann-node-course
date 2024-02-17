const fs = require('node:fs')

// const textIn = fs.readFileSync('./txt/input.txt', { encoding: 'utf-8' })
// console.log(textIn)

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

fs.readFile('./txt/starttt.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw new Error('could not read file')
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, () => {
        console.log('file written')
      })
    })
  })
})
console.log('reading file...')
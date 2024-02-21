const fs = require('node:fs')
const server = require('node:http').createServer()

server.on('request', (req, res) => {
  console.log('request')
  // Solution 1
  // fs.readFile('./test-file.txt', (err, data) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   res.end(data)
  // })

  // Solution 2: Streams
  // const readable = fs.createReadStream('./test-file.txt')
  // readable.on('data', (chunk) => {
  //   res.write(chunk)
  // })
  // readable.on('end', () => {
  //   res.end()
  // })
  // readable.on('error', (err) => {
  //   console.error(err)
  //   res.statusCode = 500
  //   res.end('file not found')
  // })

  // Solution 3: handling backpressure
  const readable = fs.createReadStream('./test-file.txt')
  // readableStream.pipe(writeableStream)
  readable.pipe(res)
})

const PORT = 8001

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
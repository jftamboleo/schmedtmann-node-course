const EventEmitter = require('node:events')
const http = require('node:http')

class TestEmitter extends EventEmitter {
  constructor() {
    super()
  }
}

const emitter = new TestEmitter()

emitter.on('testEvent', () => {
  console.log('test')
})

emitter.on('testEvent', (e1, e2) => {
  console.log(`event emitted ${JSON.stringify(e1)}. ${e2}`)
})

emitter.emit('testEvent', { id: 1, test: 'test' }, 2)


/////

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('Request received', req.headers)

  res.end('This is the response')
})

server.on('close', () => {
  console.log('server closed')
})

const port = 8001

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
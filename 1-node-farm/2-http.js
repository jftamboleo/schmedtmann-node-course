const http = require('node:http')
const fs = require('node:fs')
const url = require('node:url')
const { replaceOverview, replaceTemplate } = require('./2a-utils')

const PORT = 3000

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
const dataObj = JSON.parse(data)

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
const overviewHtml = replaceOverview(tempOverview, cardsHtml)

const server = http.createServer((req, res) => {
  const { pathname, query: { id } } = url.parse(req.url, true)

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(overviewHtml)
  }

  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)
  }

  // PRODUCT
  else if (pathname === '/product') {
    const productData = dataObj[id]
    const productHtml = replaceTemplate(tempProduct, productData)
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(productHtml)
  }

  // NOT FOUND
  else {
    res.writeHead(404, {'Content-type': 'text/html',})
    res.end('<h1>Not found</h1>')
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
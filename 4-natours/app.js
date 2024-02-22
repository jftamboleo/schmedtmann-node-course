const fs = require('node:fs')
const express = require('express')

const app = express()

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.use(express.json())

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err, data) => {
    if (err) throw new Error('error writing new tour')
    res.status(201).json({
      status: 'success',
      tour: newTour
    })
  })
})

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/api/v1/`)
})

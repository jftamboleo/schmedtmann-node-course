const fs = require('node:fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: { tours }
  })
}

const getTour = (req, res) => {
  const { id } = req.params
  const tourIndex = tours.findIndex(tour => tour.id.toString() === id)
  if (tourIndex === -1) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[tourIndex]
    }
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'error creating tour' })
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

const updateTour = (req, res) => {
  const { id } = req.params
  const tourIndex = tours.findIndex(tour => tour.id.toString() === id)
  if (tourIndex === -1) {
    return res.status(404).json({ status: 'failed', message: 'invalid id' })
  }

  const updatedTour = {
    ...tours[tourIndex],
    ...req.body
  }
  tours[tourIndex] = updatedTour

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    if (err) res.status(500).json({ status: 'failed', message: 'error updating tour' })
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })
  })
}

const deleteTour = (req, res) => {
  const { id } = req.params
  const newTours = tours.filter(tour => tour.id.toString() !== id)
  if (tours.length === newTours.length) {
    return res.json({ status: 'failed', message: 'tour not found' })
  }

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTours), err => {
    if (err) {
      return res.status(500).json({ status: 'failed', message: 'error deleting tour' })
    }
    // res.status(204)
    res.status(200).json({
      status: 'success',
      data: null
    })
  })
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}

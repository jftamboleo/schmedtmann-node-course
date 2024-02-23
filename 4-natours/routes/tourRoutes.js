const express = require('express')
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkBody
} = require('../controllers/tourController')

const router = express.Router()

// MIDDLEWARE THAT ONLY RUNS ON TOURS ROUTES WITH :id
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id: ${val}`)
//   next()
// })

router.route('/')
  .get(getAllTours)
  .post(checkBody, createTour)

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router

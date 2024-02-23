const app = require('./app')

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}/api/v1/`)
})

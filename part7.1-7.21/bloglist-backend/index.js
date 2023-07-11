const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log('server running on port 3000')
})

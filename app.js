require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// initialize knex
const Knex = require('knex')
const knexConfig = require('./knexfile')
const Model = require('objection').Model
const knex = Knex(knexConfig.development)
// Bind all Models to a knex instance.
// For multi database systems, see the Model.bindKnex method.
Model.knex(knex)

// models
const Url = require('./models/Url')

// config bodyParser() for gathering POST data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port & router
const port = process.env.PORT || 3000

// do logger and cookieParser()?

router.get('/', function (req, res) {
  let test = Url.query()
              .this((x)=> console.log(x))
  console.log(test)
  res.send('check check 1 2')
})

// router.get('/topvisitedurls', getTopVisitedURLs)
// router.get('/toprequestedurls', getTopRequestedURLs)
// router.post('/urls', new url)
// router.post('/users...', new user)
// router.put('/user/:id...', update user)
// router.get('/user/:id', user prof)

// prefix routes with /api
app.use('/api', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

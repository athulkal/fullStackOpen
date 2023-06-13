require('dotenv').config({ path: './config.env' })
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/contact')
const errorHandler = require('./middleware/errorHandler')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.static('build'))

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get('/', (req, res) => {
  res.send('<h1>Hello world again </h1>')
})

app.get('/api/persons', async (req, res) => {
  const persons = await Contact.find({})
  res.status(200).json(persons)
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const body = req.body
    console.log(body)
    // on a unsuccesful post request
    const person = await Contact.create(body)
    res.status(201).json(person)
  } catch (err) {
    console.log(err)
    next(err)
  }

  // const duplicateName = persons.filter((person) => person.name === body.name);

  // if (duplicateName.length >= 1) {
  //   return res.status(400).json({ error: "name must be unique" });
  // }
  /// on a succesful post request
})

const now = new Date(Date.now()).toString()

//ROUTE /info
app.get('/info', async (req, res) => {
  const persons = await Contact.find({})
  res.send(
    `<p>Phonebook has info for ${persons.length} people <br/><br/> ${now}</p>`
  )
})

//get single person
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Contact.findById(req.params.id)
    if (person) {
      res.status(200).json(person)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

//delete person
app.delete('/api/persons/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    console.log(err)
  }
})

//update existing person
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const person = {
      name: req.body.name,
      number: req.body.number,
    }
    const updatedPerson = await Contact.findByIdAndUpdate(
      req.params.id,
      person,
      { new: true, runValidators: true }
    )
    res.status(201).json(updatedPerson)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//unknown endpoints
app.use(unknownEndpoint)

//error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, '::', () => {
  console.log(`app listening on port ${PORT}`)
})

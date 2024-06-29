require('dotenv').config()

const express = require('express')
const app = express()

const Person = require('./models/person')

app.use(express.static('dist'))

var morgan = require('morgan')
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    var d = new Date()
    Person.find({}).then(people => {
      console.log(people);
      response.send(`<p>Phonebook has info for ${people.length} people</p>
        <p>${d}</p>`)})
})

app.get('/api/people', (request, response) => {
    Person.find({}).then(people => {
    response.json(people)
  })
})

  
app.post('/api/people', (request, response, next) => {
   const body = request.body
 
   const person = new Person({
     name: body.name,
     number: body.number,
   })
 
   person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error=>next(error))
})
  
app.put('/api/people/:id', (request, response, next) => {
  const { name, number } = content.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: `query` })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
  
app.delete('/api/people/:id', (request, response) => {
 Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log(person);
        console.log(person.toJSON());
        response.send((person.toJSON()))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
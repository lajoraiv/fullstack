const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')



let people = [
    /*{
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: "4"
    }*/
]
app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    var d = new Date()
    response.send(`<p>Phonebook has info for ${people.length} people</p>
        <p>${d}</p>`)
})

app.get('/api/people', (request, response) => {
    Person.find({}).then(people => {
    response.json(people)
  })
})

const generateId = () => {
    const maxId = people.length > 0
      ? Math.max(...people.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/people', (request, response) => {
   const body = request.body
  
   if (body.name === undefined || body.number === undefined ) {
     return response.status(400).json({ 
       error: 'Name or number missing' 
     })
   }
 
   const person = new Person({
     name: body.name,
     number: body.number,
     id: generateId(),
   })
 
   person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
  
app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})
  
app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(person => person.id !== id)

  response.status(204).end()
})
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
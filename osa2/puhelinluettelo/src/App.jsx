import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)


  const handleNameChange = (event) => {
    console.log('button clicked', event.target)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    for(var i = 0; i < persons.length; i++) {
      if (persons[i].name == newName) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const [newFilter, setNewFilter] = useState('')
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const personsToShow = showAll    
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const showFiltered = (event) => {
    event.preventDefault()
    if (newFilter.length === 0) {
      setShowAll(true)
      return
    }
    setShowAll(false)
  }

  return (
    <div>
      <Header text="Phonebook"></Header>
      <Filter newFilter={newFilter} showFiltered={showFiltered} handleFilterChange={handleFilterChange}></Filter>
      <Header text="add a new"></Header>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>
      <Header text="Numbers"></Header>
      <div>
        {personsToShow.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  )
}

const Header = (props) => {
  return (
    <div> 
       <h2>{props.text}</h2>
    </div>
  )
}

const Filter = (props) => (
  <form onChange={props.showFiltered}>
        <div>
          filter shown with: <input
            value={props.newFilter}
            onChange={handleFilterChange}/>
        </div>
      </form>
)

export default App
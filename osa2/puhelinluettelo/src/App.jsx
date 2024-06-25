import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  
  useEffect(() => {
    personService
    .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log('button clicked', event.target)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    var matchFound = false

    const personObject = {
      name: newName,
      number: newNumber
    }

    for(var i = 0; i < persons.length; i++) {
      if (persons[i].name == newName) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          var id = persons[i].id
          personService
            .update(id, personObject).then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson ))
            })
        }
        setNewName('')
        setNewNumber('')
        matchFound = true
        return
      }
    }
    if (matchFound === false) {
        personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
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
    console.log(newFilter)
    if (newFilter.length === 0) {
      setShowAll(true)
      return
    }
    setShowAll(false)
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
          .then(responseData => {
            setPersons(persons.filter(n => n.id !== id))
          })
          .catch(error => { console.log("It didnt work", error)})
        }
  }

  return (
    <div>
      <Header text="Phonebook"></Header>
      <Filter newFilter={newFilter} showFiltered={showFiltered} handleFilterChange={handleFilterChange}></Filter>
      <Header text="add a new"></Header>
      <AddNumber addPerson ={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Header text="Numbers"></Header>
      <Phonebook personsToShow={personsToShow} removePerson={removePerson}/>
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
    <form onSubmit={props.showFiltered}>
          <div>
            filter shown with: <input
              value={props.newFilter}
              onChange={props.handleFilterChange}/>
          </div>
        </form>
  )

  const AddNumber = (props) => (
    <form onSubmit={props.addPerson}>
          <div>
            name: <input
              value={props.newName}
              onChange={props.handleNameChange}/>
          </div>
          <div>
            number: <input
              value={props.newNumber}
              onChange={props.handleNumberChange}/>
          </div>
          <div>
          <button type="submit">add</button>
          </div>
        </form>
  )

  const Phonebook = (props) => (
    <div>
      {props.personsToShow.map(person => 
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => props.removePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      )}
    </div>
  )

export default App
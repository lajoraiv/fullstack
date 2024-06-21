import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
           console.log('promise fulfilled')
           setPersons(response.data)      
          })
        }, [])
        console.log('render', persons.length, 'persons')

  
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
      <AddNumber addPerson ={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Header text="Numbers"></Header>
      <Phonebook personsToShow={personsToShow} />
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
      <div key={person.name}>{person.name} {person.number}</div>
    )}
  </div>
)

export default App
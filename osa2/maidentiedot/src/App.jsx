import { useState, useEffect } from 'react'
import apicommsServices from './services/apicomms'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    apicommsServices
    .getAll()
      .then(initialData => {
        console.log("Initial data:",initialData);
        setCountries(initialData)
      })
  }, [])

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const countriesToShow = showAll    
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const showFiltered = (event) => {
    event.preventDefault()
    console.log(newFilter)
    if (newFilter.length === 0) {
      setShowAll(true)
      return
    }
    setShowAll(false)
  }

return (
  <div>
    <h1>Countries</h1>
    <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} showFiltered={showFiltered} />
    <CountryList array={countriesToShow} setNewFilter={setNewFilter} />
  </div>
  )
}



const CountryList = (props) => {
  console.log("props", props.array)
  if (!props.array) return null
  if (props.array.length > 10) return (
    <p>Too many to show</p>
  )
  if (props.array.length === 1) return (
    Country(props.array[0])
  )
  return (
    <div>
        {props.array.map(object => 
          <div key={object.name.common}>
            {object.name.common}
            <button onClick={() => props.setNewFilter(object.name.common)}>
              show
            </button>
          </div>)}
    </div>
  )
}

const Filter = (props) => (
  <form onChange={props.showFiltered}>
        <div>
          find countries: <input
            value={props.newFilter}
            onChange={props.handleFilterChange}/>
        </div>
      </form>
)

export default App
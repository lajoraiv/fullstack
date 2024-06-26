import apicommsServices from "../services/apicomms"
import Weather from "./Weather"
import { useState, useEffect } from 'react'

const Country = (array) => {
    console.log("komponentille tulee :",array)
    const languages = Object.values(array.languages)
    const imgsrc = Object.values(array.flags)
    const capital = array.capital[0]
    console.log("Tämä on pääkaupunki: ",capital)
    const [weatherData, setWeatherdata] = useState([])
    console.log(languages)
    useEffect(() => {
        apicommsServices
        .getWeather(capital)
          .then(initialData => {
            console.log("Initial data:",initialData);
            setWeatherdata(initialData)
          })
      }, [])
    
    return (
        <div>
            <h1>{array.name.common}</h1>
            <p>
            capital {capital}<br></br>
            area {array.area}<br></br>
            </p>
            <p><b>languages:</b></p>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={imgsrc[0]} alt={imgsrc[imgsrc.length]} />
            <Weather capital={capital} weatherData={weatherData}/>
        </div>
    )
}

export default Country
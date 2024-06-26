const Weather = (props) => {
    if (props.weatherData.length === 0) return (
        <div>Loading...</div>
    )
    
    return (
        <div>
            <h1>Weather in {props.capital}</h1>
            <p>temperature {Math.round((props.weatherData.main.temp-273.15) * 100)/100} °C</p>
            <img src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`} alt={props.weatherData.weather[0].description} />
            <p>wind {props.weatherData.wind.speed} m/s</p>
        </div>
    )

}

export default Weather
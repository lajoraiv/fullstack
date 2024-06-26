import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_OPENWEATHER_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  console.log("This is the request",request);
  return request.then(response => response.data)
}

const getWeather = (cityName) => {
  const request =  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`)
  console.log("Openweather API request",request);
  return request.then(response => response.data)
}

export default { getAll, getWeather }
import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const key = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (capital) => {
  const req = axios.get(`${baseUrl}?q=${capital}&APPID=${key}`)
  return req.then(res => res.data)
}

export default getWeather
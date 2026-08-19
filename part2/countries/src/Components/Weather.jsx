import { useEffect, useState } from "react"
import getWeather from "../Services/weather"

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getWeather(capital)
      .then(weatherCountry => setWeather(weatherCountry))
  }, [capital])

  if (!weather) return <p>Loading weather</p>

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
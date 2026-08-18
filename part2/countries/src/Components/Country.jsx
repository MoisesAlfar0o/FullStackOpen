import { useEffect, useState } from "react"
import axios from 'axios'
import Weather from "./Weather"

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const { 
    name: { common }, 
    capital, 
    area, 
    languages, 
    flags 
  } = country

  const flagsValues = Object.values(flags)

  useEffect(() => {
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY
    const query = capital[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${key}`)
      .then(res => {
        setWeather(res.data)
      })
  }, [common, capital])

  return (
    <>
      <h1>{common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={flagsValues.at(0)} alt={flagsValues.at(-1)} />
      <Weather countryWeather={weather} />
    </>
  )
}

export default Country
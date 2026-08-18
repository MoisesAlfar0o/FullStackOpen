import { useState } from "react"
import Country from "./Country"


const Countries = ({ countries }) => {
  const [selected, setSelected] = useState(null)

  const onSelected = (country) => {
    setSelected(prev => {
      if(prev?.name.common) return null
      return country
    })
  }

  if(selected) return <Country country={selected} />
  
  return (
    <>
      {countries.map(country => (
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => onSelected(country)}>Show</button>
        </p>
      ))}
    </>
  )
}

export default Countries
import { useEffect } from "react"
import { useState } from "react"
import Content from "./Components/Content"
import getCountries from "./Services/countries"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [matchCountries, setMatchCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
      getCountries()
      .then(initialData => setCountries(initialData))
  }, [])

  const handleFilter = (e) => {
    const newFilter = e.target.value
    const filteredCountries = newFilter.trim().length === 0
      ? []
      : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

    setFilter(newFilter)
    setMatchCountries(filteredCountries)
  }

  return (
    <div>
      Filter countries <input type="text" onChange={handleFilter} value={filter}/>
      <Content countries={matchCountries} />
    </div>
  )
}

export default App
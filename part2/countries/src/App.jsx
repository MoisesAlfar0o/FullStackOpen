import { useEffect } from "react"
import { useState } from "react"
import Content from "./Components/Content"
import getCountries from "./Services/countries"
import Filter from "./Components/Filter"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setfilteredCountries] = useState([])
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
    setfilteredCountries(filteredCountries)
  }

  return (
    <div>
      <Filter onChange={handleFilter} filter={filter}/>
      <Content countries={filteredCountries} />
    </div>
  )
}

export default App
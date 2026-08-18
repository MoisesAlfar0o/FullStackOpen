import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Content from "./Components/Content"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [matchCountries, setMatchCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const filteredCountries = filter.trim().length === 0
      ? []
      : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

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
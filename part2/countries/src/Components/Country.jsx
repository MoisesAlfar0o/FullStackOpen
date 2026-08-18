const Country = ({ country }) => {
  const { 
    name: { common }, 
    capital, 
    area, 
    languages, 
    flags 
  } = country

  const flagsValues = Object.values(flags)

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
    </>
  )
}

export default Country
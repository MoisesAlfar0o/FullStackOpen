import Weather from "./Weather"

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
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={flagsValues.at(0)} alt={flagsValues.at(-1)} />
      <Weather capital={capital[0]} />
    </>
  )
}

export default Country
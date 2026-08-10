import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)


  const filteredPersons = filter
   ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   : persons

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const alreadyExists = (name) => persons.find(person => person.name === name)

  const handleSubmit = (e) => {
    e.preventDefault()

    const exists = alreadyExists(newName)

    if(exists) {
      return alert(`${newName} is already added to phonebook`)
    }

    const obj = {
      name: newName,
      number: newNumber 
    }

    setPersons(persons.concat(obj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter} value={filter}/>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleName} value={newName} required/>
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filteredPersons.map(person => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))
      }
    </div>
  )
}

export default App
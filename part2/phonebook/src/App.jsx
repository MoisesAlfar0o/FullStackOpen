import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)
  
  const filteredPersons = filter
   ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   : persons

  const alreadyExists = (name) => persons.some(person => person.name === name)

  const handleSubmit = (e) => {
    e.preventDefault()

    const exists = alreadyExists(newName)

    if(exists) {
      return alert(`${newName} is already added to phonebook`)
    }

    const obj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(obj))
    setNewName('')
    setNewNumber('')
  }

  const onDelete = (id) => {
    const arr = persons.filter(p => p.id !== id)
    console.log('deleted', arr)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} value={filter}/>
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={handleSubmit} 
        handleName={handleName} 
        handleNumber={handleNumber}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={onDelete} />
    </div>
  )
}

export default App
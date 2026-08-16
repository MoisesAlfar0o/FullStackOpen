import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilter(e.target.value)
  
  const checkExists = (name) => persons.find(person => person.name === name)

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = checkExists(newName)

    if(result) {
      if(window.confirm(`${result.name} is already added to phonebook. replace the old number with a new one?`)) {
        const obj = {...result, number: newNumber}
        personService
          .update(result.id, obj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== result.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
           .catch(() => {
            alert(
              `the person '${result.name}' was already deleted from server`
            )
            setPersons(
              persons.filter(person => person.id !== result.id)
            )
          })
      }
    } else {
      const obj = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(obj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
        })
        .catch(() => {
          alert(`${name} was already deleted from server`)
          setPersons(
            persons.filter(person => person.id !== id)
          )
        })
    }
  } 

  const filteredPersons = filter
   ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   : persons

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
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
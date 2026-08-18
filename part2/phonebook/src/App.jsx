import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
            setNotification({
              msg: `the person '${result.name}' was already deleted from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
             }, 4000)
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
          setNotification({
            msg: `Added ${obj.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 4000)

          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          setNotification()
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
          setNotification({
            msg: `Information of ${name} has already been removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
      <Notification message={notification} />
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
import { useEffect, useState } from 'react'

import personService from './services/persons'

import Names from './components/Names'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter , setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => console.log('Tietojen haku epäonnistui', error))
  }, [])

  console.log('render', persons.length, 'persons')

  const AddPerson = (event) => {
    setNewName(event.target.value)
  }

  const AddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const AddFilter = (event) => {
    setFilter(event.target.value)
  }

  const Submit = (event) => {
    event.preventDefault()
    console.log("Lähetettiin lomake")

    const newPerson = { name: newName, number: newNumber }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} on jo luettelossa, päivitetäänkö numero?`)) {
        personService.update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : updatedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => console.log('Päivitys epäonnistui', error))
      }
      return
    }

    personService.create(newPerson)
      .then(addedPerson => {
        setPersons([...persons, addedPerson])
        setNewName('')
        setNewNumber('')
      })
      .catch(error => console.log('Lisäys epäonnistui', error))
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!persons) return;

    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => console.log('Poisto epäonnistui', error))
    }
  }
  const filteredPerson = persons.filter(person =>
    filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : true
  )

  console.log("Suodatettu lista:", filteredPerson)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={AddFilter} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={Submit}
        newName={newName}
        newNumber={newNumber}
        addName={AddPerson}
        addNumber={AddNumber}
      />

      <h2>Numbers</h2>
      <Names persons={filteredPerson} onDelete={deletePerson} />
    </div>
  )
}

export default App

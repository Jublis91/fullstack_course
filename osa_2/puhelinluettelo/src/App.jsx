import { useState } from 'react'

import Names from './components/Names'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter , setFilter] = useState('')

  const AddPerson = (event) => {
    console.log("Nimen syöttökenttä:", event.target.value)
    setNewName(event.target.value)
  }

  const AddNumber = (event) => {
    console.log("Numeron syöttökenttä:", event.target.value)
    setNewNumber(event.target.value)
  }

  const AddFilter = (event) => {
    console.log("Hakukenttä:", event.target.value)
    setFilter(event.target.value)
  }

  const Submit = (event) => {
    event.preventDefault()
    console.log("Lähetettiin lomake")
    console.log("Lisättävä nimi:", newName)
    console.log("Lisättävä numero:", newNumber)

    const newPerson = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      console.log(`Virhe: ${newName} on jo lisätty`)
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons, newPerson])
    console.log("Henkilölista päivitetty:", [...persons, newPerson])

    setNewName('')
    setNewNumber('')
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
      <Names persons={filteredPerson} />
    </div>
  )
}

export default App

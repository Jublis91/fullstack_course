import { useEffect, useState } from "react"

import "./index.css"

import personService from "./services/persons"
import Names from "./components/Names"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({ message: null, type: "" })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        console.log("Tietojen haku epäonnistui", error)
        showNotification("Tietojen haku epäonnistui", "error")
      })
  }, [])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: "" })
    }, 4000);
  }

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
    event.preventDefault();
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
            setNewName("")
            setNewNumber("")
            showNotification(`Päivitettiin ${newName} numero`, "success")
          })
          .catch(error => {
            console.log("Päivitys epäonnistui", error)
            showNotification(`Henkilö ${newName} oli jo poistettu`, "error")
          })
      }
      return
    }

    personService.create(newPerson)
      .then(addedPerson => {
        setPersons([...persons, addedPerson])
        setNewName("")
        setNewNumber("")
        showNotification(`Lisättiin ${newName}`, "success")
      })
      .catch(error => {
        console.log("Lisäys epäonnistui", error)
        showNotification("Lisäys epäonnistui", "error")
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Poistettiin ${person.name}`, "success")
        })
        .catch(error => {
          console.log("Poisto epäonnistui", error);
          showNotification(`Henkilö ${person.name} oli jo poistettu`, "error")
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    filter ? person.name.toLowerCase().includes(filter.toLowerCase()) : true
  )

  console.log("Suodatettu lista:", filteredPersons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: null, type: "" })}
      />

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
      <Names persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App

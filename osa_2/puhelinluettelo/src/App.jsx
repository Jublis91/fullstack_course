import { useState } from 'react'

import Names from './components/Names'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const AddPerson = (event) => {
    setNewName(event.target.value)
  }

  const Submit = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }
    
  
  
    return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={Submit}>
        <div>
          name: <input value={newName} onChange={AddPerson}/>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  )

}

export default App
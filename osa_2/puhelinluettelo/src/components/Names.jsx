const Names = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </ul>
  )
}

const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name}: {person.number} 
      <button onClick={() => onDelete(person.id)}> Poista </button>
    </li>
  )
}

export default Names
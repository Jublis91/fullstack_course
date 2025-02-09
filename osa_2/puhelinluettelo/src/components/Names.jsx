const Names = ({ persons }) => {
    return (
      <ul>
        {persons.map((person, index) => (
          <Person key={index} person={person} />
        ))}
      </ul>
    )
  }
  
  const Person = ({ person }) => {
    return <li>{person.name}: {person.number}</li>
  }
  
  export default Names
  
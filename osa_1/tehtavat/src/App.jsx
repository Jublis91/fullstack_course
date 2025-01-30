const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course)

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}
          </p>
          ))}
      <p>
        Number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </div>
  )
}

export default App
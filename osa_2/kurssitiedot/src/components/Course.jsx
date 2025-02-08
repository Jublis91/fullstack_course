const Course = ({ course }) => {
    console.log("Kurssi komponentti saatu", course)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    console.log("Renderöidään otsikko", name)
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    console.log("Renderöidään sisältö", parts)
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
                ))}
        </div>
    )
}

const Part = ({ name, exercises }) => {
    console.log("Renderöidään osa", name, exercises)
    return (
        <p>{name} {exercises}</p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    console.log("Renderöidään tehtäviä yhteensä", total)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

export default Course
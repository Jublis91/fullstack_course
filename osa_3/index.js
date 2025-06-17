const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())


morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
  {
    id: "1",
    content: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    content: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    content: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    content: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Hae kaikki henkilöt
app.get('/info', (req, res) => {
    const count = persons.length
    const date = new Date()

    res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
    `)
})

// Hae henkilö id:n perusteella
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
  res.json(person)
} else {
  res.status(404).end()
}
})

// Poista henkilö id:n perusteella
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

// Lisää uusi henkilö
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Tarkista, että nimi ja numero on annettu
  if (!body.content || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  // Tarkista, onko nimi jo olemassa
  const nameExists = persons.find(p => p.content === body.content)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  // Luo uusi henkilö
  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(), // Satunnainen id merkkijonona
    content: body.content,
    number: body.number,
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
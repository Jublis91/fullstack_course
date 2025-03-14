import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(`Voted for anecdote ${selected}:`, copy[selected])
  }

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
    console.log(`Selected new anecdote index: ${randomIndex}`)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))
  if (votes[mostVotedIndex] > votes[mostVoted]) {
    setMostVoted(mostVotedIndex)
    console.log(`Most voted anecdote index: ${mostVotedIndex}`)
  }

  console.log(`Debug: Selected anecdote index: ${selected}`)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={nextAnecdote} text="Next anecdote" />
      <Button handleClick={voteAnecdote} text="Vote" />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <p>Has {votes[mostVoted]} votes</p>
    </div>
  )
}

export default App

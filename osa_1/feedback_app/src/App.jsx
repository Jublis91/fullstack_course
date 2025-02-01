import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, all }) => {
  const total = good + neutral + bad
  const avarage = (good - bad) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

              //Tällä hetkellä menossa 1.10: unicafe step5

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Avarage: {avarage}</p>
      <p>Positive: {positive} %</p>
    </div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    console.log('good: ', good)
    console.log('all: ', all)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    console.log('neutral: ', neutral)
    console.log('all: ', all)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    console.log('bad: ', bad)
    console.log('all: ', all)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App